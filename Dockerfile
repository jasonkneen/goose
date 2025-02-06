# syntax=docker/dockerfile:1

# Stage 1: Build the Goose binary
FROM rust:1.56 as builder

WORKDIR /app

# Copy the source code and build dependencies
COPY . .

# Build the Goose binary
RUN cargo build --release --package goose-cli

# Stage 2: Create the final image
FROM debian:buster-slim

WORKDIR /app

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the Goose binary from the builder stage
COPY --from=builder /app/target/release/goose /usr/local/bin/goose

# Set the entrypoint to the Goose binary
ENTRYPOINT ["goose"]
