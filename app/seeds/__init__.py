from flask.cli import AppGroup
from .users import seed_users, undo_users
from .planets import seed_planets, undo_planets
from .transactions import seed_transactions, undo_transactions
from .assets import seed_assets, undo_assets

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")

# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_planets()
    seed_transactions()
    seed_assets()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_planets()
    undo_transactions()
    undo_assets()
    # Add other undo functions here
