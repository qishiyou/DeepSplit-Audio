# DeepSplit Audio

A web interface for audio separation with AI. Separate vocals, drums, bass and others from any track using state-of-the-art models.

![Screenshot](docs/web.png)

## Deployment

First, you need to deploy the audio separation server inside `demucs` folder somewhere.
This server will be responsible for separating the audio tracks, so it needs GPU support.

I deployed this on [Lightning AI](https://lightning.ai).

These are environment variables for the audio separation server:

- `API_URL`: URL of the web interface server
- `MODEL`: Model to use for separation. `htdemucs_ft` is recommended. Read more about the models [here](https://github.com/adefossez/demucs/?tab=readme-ov-file#separating-tracks).

Then you can deploy the web interface server:

```bash
docker compose up -d --build
```

These are environment variables for the web interface server:

- `SECRET`: Secret key for the server, used for authentication
- `DEMUCS_API`: URL of the audio separation server
- `DEMUCS_API_KEY`: API key for the audio separation server (optional, if deployed on Lightning AI)

## Development

Make sure you have Bun installed, then run:

```bash
bun dev
```

Check `http://localhost:3000` to see the result.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
