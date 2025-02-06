# Use a multi-stage build to minimize the final image size

# Stage 1: Build the Goose binary
FROM rust:latest AS builder

# Set the working directory
WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Copy the source code
COPY . .

# Build the Goose binary
RUN cargo build --release --package goose-cli

# Stage 2: Create the final image
FROM debian:buster-slim

# Set the working directory
WORKDIR /app

# Copy the Goose binary from the build stage
COPY --from=builder /app/target/release/goose /usr/local/bin/goose

# Set the entrypoint to the Goose binary
ENTRYPOINT ["goose"]
