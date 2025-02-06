use super::base::Config;
use crate::agents::ExtensionConfig;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

const DEFAULT_EXTENSION: &str = "developer";

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct ExtensionEntry {
    pub enabled: bool,
    #[serde(flatten)]
    pub config: ExtensionConfig,
}

/// Extension configuration management
pub struct ExtensionManager;

impl ExtensionManager {
    /// Get the extension configuration if enabled
    pub fn get_config(name: &str) -> Result<Option<ExtensionConfig>> {
        let config = Config::global();

        // Try to get the extension entry
        let extensions: HashMap<String, ExtensionEntry> = match config.get("extensions") {
            Ok(exts) => exts,
            Err(super::ConfigError::NotFound(_)) => {
                // Initialize with default developer extension
                let defaults = HashMap::from([(
                    DEFAULT_EXTENSION.to_string(),
                    ExtensionEntry {
                        enabled: true,
                        config: ExtensionConfig::Builtin {
                            name: DEFAULT_EXTENSION.to_string(),
                        },
                    },
                )]);
                config.set("extensions", serde_json::to_value(&defaults)?)?;
                defaults
            }
            Err(e) => return Err(e.into()),
        };

        // Read the .gooseignore file and get the list of ignored paths
        let ignored_paths = read_gooseignore().unwrap_or_default();

        Ok(extensions.get(name).and_then(|entry| {
            if entry.enabled && !ignored_paths.contains(&name.to_string()) {
                Some(entry.config.clone())
            } else {
                None
            }
        }))
    }

    /// Set or update an extension configuration
    pub fn set(entry: ExtensionEntry) -> Result<()> {
        let config = Config::global();

        let mut extensions: HashMap<String, ExtensionEntry> =
            config.get("extensions").unwrap_or_else(|_| HashMap::new());

        extensions.insert(entry.config.name().parse()?, entry);
        config.set("extensions", serde_json::to_value(extensions)?)?;
        Ok(())
    }

    /// Remove an extension configuration
    pub fn remove(name: &str) -> Result<()> {
        let config = Config::global();

        let mut extensions: HashMap<String, ExtensionEntry> =
            config.get("extensions").unwrap_or_else(|_| HashMap::new());

        extensions.remove(name);
        config.set("extensions", serde_json::to_value(extensions)?)?;
        Ok(())
    }

    /// Enable or disable an extension
    pub fn set_enabled(name: &str, enabled: bool) -> Result<()> {
        let config = Config::global();

        let mut extensions: HashMap<String, ExtensionEntry> =
            config.get("extensions").unwrap_or_else(|_| HashMap::new());

        if let Some(entry) = extensions.get_mut(name) {
            entry.enabled = enabled;
            config.set("extensions", serde_json::to_value(extensions)?)?;
        }
        Ok(())
    }

    /// Get all extensions and their configurations
    pub fn get_all() -> Result<Vec<ExtensionEntry>> {
        let config = Config::global();
        let extensions: HashMap<String, ExtensionEntry> =
            config.get("extensions").unwrap_or_default();
        Ok(Vec::from_iter(extensions.values().cloned()))
    }

    /// Get all extension names
    pub fn get_all_names() -> Result<Vec<String>> {
        let config = Config::global();
        Ok(config
            .get("extensions")
            .unwrap_or_else(|_| get_keys(Default::default())))
    }

    /// Check if an extension is enabled
    pub fn is_enabled(name: &str) -> Result<bool> {
        let config = Config::global();
        let extensions: HashMap<String, ExtensionEntry> =
            config.get("extensions").unwrap_or_else(|_| HashMap::new());

        Ok(extensions.get(name).map(|e| e.enabled).unwrap_or(false))
    }
}

/// Read the .gooseignore file and return a list of ignored paths
fn read_gooseignore() -> Result<Vec<String>, Box<dyn std::error::Error>> {
    let path = Path::new(".gooseignore");
    let file = File::open(path)?;
    let reader = io::BufReader::new(file);

    let mut ignored_paths = Vec::new();
    for line in reader.lines() {
        let line = line?;
        if !line.trim().is_empty() && !line.starts_with('#') {
            ignored_paths.push(line);
        }
    }

    Ok(ignored_paths)
}

fn get_keys(entries: HashMap<String, ExtensionEntry>) -> Vec<String> {
    entries.into_keys().collect()
}
