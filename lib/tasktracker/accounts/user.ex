defmodule Tasktracker.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.User


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string, [source: :password]
    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash])
    |> put_pass_hash
    |> validate_required([:name, :email, :password_hash])
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password_hash: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end

  defp put_pass_hash(changeset), do: changeset
end

