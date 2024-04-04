# Transistor

Transistor is an incredibly over-engineered channel-to-channel relay bot for Discord. It consists of two services:
collector and emitter. Collector handles events from Discord, including slash commands and message events. Emitter
dispatches webhooks to relay messages to other channels across discord.

## Concepts

### Trace

A Trace is an omnidirectional connection between two or more channels. Messages created in one channel will be
automatically conveyed to all other channels connected to the Trace. Each trace has an owner, and an owner can add
additional authorized users who are allowed to join channels to the Trace.

Things that need to be handled within traces:

- Message events
  - Message create
  - Message edit
  - Message delete
- Thread events (public threads only)
  - Thread create
  - Thread update
  - Thread delete

## Considerations

- Should bot messages be forwarded on a Trace?
  - Could make it a per-Trace setting
- What permissions should be required to set up a Trace?
  - Manage server, or maybe only manage channels?

## Architecture

- Use a Redis (fork?) to queue messages.
- When a Collector receives a message event, add it to the Trace's message queue.
- Emitters wait on messages in the queue, and act on them on a FIFO basis.
  - Order of relayed messages cannot be guaranteed, but we can make a best-effort attempt.
- Collectors and Emitters will be written with Node.JS and Oceanic.
  - Need to look into and determine if a library for interaction handling should be used.
- Store information in a Postgres database using Prisma.
  - Traces
  - Trace authorized users
  - Channels joined to Trace
  - Mapping of original IDs -> relayed IDs to allow updating of content.
    - This will likely need to be cached as well to reduce the load on the database.
