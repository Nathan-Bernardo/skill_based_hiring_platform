from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "Listee App"
    DEBUG_MODE: bool = True


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str = "mongodb+srv://ncbernar:Asianboy1998!@cluster0.eeofb.mongodb.net/profileDatabase?retryWrites=true&w=majority"
    DB_NAME: str = "listee"


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass

settings = Settings()
