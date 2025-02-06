# Use a multi-stage build to compile the goose binary and create a minimal image

# Stage 1: Build the goose binary
FROM rust:1.56 as builder

WORKDIR /app

# Copy the source code
COPY . .

# Build the goose binary
RUN cargo build --release --package goose-cli

# Stage 2: Create a minimal image
FROM debian:buster-slim

WORKDIR /app

# Copy the goose binary from the builder stage
COPY --from=builder /app/target/release/goose /usr/local/bin/goose

# Set the entrypoint to the goose binary
ENTRYPOINT ["goose"]
