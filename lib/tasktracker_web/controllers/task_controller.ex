defmodule TasktrackerWeb.TaskController do
  use TasktrackerWeb, :controller

  alias Tasktracker.TaskManager
  alias Tasktracker.TaskManager.Task

  action_fallback TasktrackerWeb.FallbackController

  def index(conn, %{ "token" => %{ "token" => token}}) do
    with {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      tasks = Tasktracker.TaskManager.get_task_by_user_id(user_id)
      render(conn, "index.json", tasks: tasks)
    end
  end

  def create(conn, %{"task" => task_params, "token" => %{ "token" => token }}) do

    with {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      time_spent = Map.get(task_params, "time spent")
      task_params = Map.delete(task_params, "time spent")

      tasktracker_params = %{"user_id" => Map.get(task_params, "user_id"), "time" => time_spent}
      tasktracker_params = for {key, val} <- tasktracker_params, into: %{}, do: {String.to_atom(key), val}

      task_params = Map.put(
        task_params,
        "timetrackers",
        %{"0" => %{}}
        |> Map.put("0", tasktracker_params)
      )
#      task_params = Map.put(task_params, "user_id", user_id)
      with {:ok, %Task{} = task} <- TaskManager.create_task(task_params) do
        tasks = Tasktracker.TaskManager.get_task_by_user_id(user_id)
        conn
        |> put_status(:created)
        |> render("index.json", tasks: tasks)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    task = TaskManager.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => %{ "token" => token }}) do

    with {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      task = TaskManager.get_task!(Map.get(task_params, "id"))

      with {:ok, %Task{} = task} <- TaskManager.update_task(task, task_params) do
        tasks = Tasktracker.TaskManager.get_task_by_user_id(user_id)

        conn
        |> put_status(:ok)
        |> render("index.json", tasks: tasks)
      end
    end
  end

  def delete(conn, %{"id" => id, "token" => %{ "token" => token}}) do
    with {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      task = TaskManager.get_task!(id)
      with {:ok, %Task{}} <- TaskManager.delete_task(task) do
        tasks = Tasktracker.TaskManager.get_task_by_user_id(user_id)

        conn
        |> put_status(:ok)
        |> render("index.json", tasks: tasks)
      end
    end
  end
end
