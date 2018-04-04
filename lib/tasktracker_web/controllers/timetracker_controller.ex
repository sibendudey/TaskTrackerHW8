defmodule TasktrackerWeb.TimetrackerController do
  use TasktrackerWeb, :controller

  alias Tasktracker.TaskManager
  alias Tasktracker.TaskManager.Timetracker

  action_fallback TasktrackerWeb.FallbackController

  def index(conn, _params) do
    timetrackers = TaskManager.list_timetrackers()
    render(conn, "index.json", timetrackers: timetrackers)
  end

  def create(conn, %{"timetracker" => timetracker_params}) do
    with {:ok, %Timetracker{} = timetracker} <- TaskManager.create_timetracker(timetracker_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", timetracker_path(conn, :show, timetracker))
      |> render("show.json", timetracker: timetracker)
    end
  end

  def show(conn, %{"id" => id}) do
    timetracker = TaskManager.get_timetracker!(id)
    render(conn, "show.json", timetracker: timetracker)
  end

  def update(conn, %{"id" => id, "timetracker" => timetracker_params}) do
    timetracker = TaskManager.get_timetracker!(id)

    with {:ok, %Timetracker{} = timetracker} <- TaskManager.update_timetracker(timetracker, timetracker_params) do
      render(conn, "show.json", timetracker: timetracker)
    end
  end

  def delete(conn, %{"id" => id}) do
    timetracker = TaskManager.get_timetracker!(id)
    with {:ok, %Timetracker{}} <- TaskManager.delete_timetracker(timetracker) do
      send_resp(conn, :no_content, "")
    end
  end
end
