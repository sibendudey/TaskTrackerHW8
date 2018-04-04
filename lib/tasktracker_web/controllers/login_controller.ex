defmodule TasktrackerWeb.LoginController do
  use TasktrackerWeb, :controller
  alias Tasktracker.Accounts.User

  action_fallback TasktrackerWeb.FallbackController

  #attribution Professor Nat Tuck code
  def create(conn, %{"name" => name, "pass" => pass}) do
    IO.puts "Create called"
    with {:ok, %User{} = user} <- Tasktracker.Accounts.get_user_by_email(name, pass) do

      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end