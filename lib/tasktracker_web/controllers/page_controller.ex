defmodule TasktrackerWeb.PageController do
  use TasktrackerWeb, :controller
  alias Tasktracker.TaskManager.Timetracker
  alias Tasktracker.TaskManager.Task

  def index(conn, _params) do
    render conn, "index.html"
  end

  def feed(conn, params) do
    tasks = Tasktracker.TaskManager.get_task_by_user_id(params["user_id"])
    task = %Task{timetrackers: [%Timetracker{}]}
    IO.inspect tasks
#    Changes that used to work
#    changeset = Tasktracker.TaskManager.change_task(%Tasktracker.TaskManager.Task{})
    changeset = Tasktracker.TaskManager.change_task(task)
    users = Tasktracker.Accounts.list_users() |> Enum.map(&{&1.name, &1.id})
    render conn, "feed.html", tasks: tasks, changeset: changeset, users: users
  end
end
