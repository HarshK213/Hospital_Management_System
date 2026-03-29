from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # MongoDB
    MONGODB_URL: str = "mongodb+srv://HarshK:Harsh123@cluster0.nmujbad.mongodb.net"
    DATABASE_NAME: str = "medicare"

    # Google Gemini API
    GEMINI_API_KEY: str = "AIzaSyDfNR1CL4bDPHbRbO4tJBf3wwtGDG5U8mQ"

    # App
    APP_ENV: str = "development"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
