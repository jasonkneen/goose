use anyhow::Result;
use goose_mcp::{
    ComputerControllerRouter, DeveloperRouter, GoogleDriveRouter, JetBrainsRouter, MemoryRouter,
};
use mcp_server::router::RouterService;
use mcp_server::{BoundedService, ByteTransport, Server};
use tokio::io::{stdin, stdout};
use tokio::time::{timeout, Duration};

pub async fn run_server(name: &str) -> Result<()> {
    // Initialize logging
    crate::logging::setup_logging(Some(&format!("mcp-{name}")))?;

    tracing::info!("Starting MCP server");

    let router: Option<Box<dyn BoundedService>> = match name {
        "developer" => Some(Box::new(RouterService(DeveloperRouter::new()))),
        "computercontroller" => Some(Box::new(RouterService(ComputerControllerRouter::new()))),
        "jetbrains" => Some(Box::new(RouterService(JetBrainsRouter::new()))),
        "google_drive" | "googledrive" => {
            let router = GoogleDriveRouter::new().await;
            Some(Box::new(RouterService(router)))
        }
        "memory" => Some(Box::new(RouterService(MemoryRouter::new()))),
        _ => None,
    };

    // Create and run the server
    let server = Server::new(router.unwrap_or_else(|| panic!("Unknown server requested {}", name)));
    let transport = ByteTransport::new(stdin(), stdout());

    tracing::info!("Server initialized and ready to handle requests");

    // Add timeout and cancellation handling
    let server_future = server.run(transport);
    match timeout(Duration::from_secs(30), server_future).await {
        Ok(result) => result,
        Err(_) => {
            tracing::warn!("Timeout occurred while running the server");
            // Handle cancellation logic here if needed
            Ok(())
        }
    }
}
