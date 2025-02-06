use anyhow::Result;
use async_trait::async_trait;
use futures::stream::BoxStream;
use serde_json::Value;

use super::extension::{ExtensionConfig, ExtensionResult};
use crate::message::Message;
use crate::providers::base::ProviderUsage;

/// Core trait defining the behavior of an Agent
#[async_trait]
pub trait Agent: Send + Sync {
    /// Create a stream that yields each message as it's generated by the agent
    async fn reply(&self, messages: &[Message]) -> Result<BoxStream<'_, Result<Message>>>;

    /// Add a new MCP client to the agent
    async fn add_extension(&mut self, config: ExtensionConfig) -> ExtensionResult<()>;

    /// Remove an extension by name
    async fn remove_extension(&mut self, name: &str);

    /// List all extensions
    // TODO this needs to also include status so we can tell if extensions are dropped
    async fn list_extensions(&self) -> Vec<String>;

    /// Pass through a JSON-RPC request to a specific extension
    async fn passthrough(&self, extension: &str, request: Value) -> ExtensionResult<Value>;

    /// Get the total usage of the agent
    async fn usage(&self) -> Vec<ProviderUsage>;

    /// Detect and handle endless loops by breaking out of the loop after a certain number of iterations
    async fn detect_and_handle_endless_loop(&self, iterations: usize) -> bool {
        const MAX_ITERATIONS: usize = 100;
        if iterations > MAX_ITERATIONS {
            return true;
        }
        false
    }
}
