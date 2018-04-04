defmodule TasktrackerWeb.TimetrackerControllerTest do
  use TasktrackerWeb.ConnCase

  alias Tasktracker.TaskManager
  alias Tasktracker.TaskManager.Timetracker

  @create_attrs %{time: 42}
  @update_attrs %{time: 43}
  @invalid_attrs %{time: nil}

  def fixture(:timetracker) do
    {:ok, timetracker} = TaskManager.create_timetracker(@create_attrs)
    timetracker
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timetrackers", %{conn: conn} do
      conn = get conn, timetracker_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create timetracker" do
    test "renders timetracker when data is valid", %{conn: conn} do
      conn = post conn, timetracker_path(conn, :create), timetracker: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, timetracker_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "time" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, timetracker_path(conn, :create), timetracker: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update timetracker" do
    setup [:create_timetracker]

    test "renders timetracker when data is valid", %{conn: conn, timetracker: %Timetracker{id: id} = timetracker} do
      conn = put conn, timetracker_path(conn, :update, timetracker), timetracker: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, timetracker_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "time" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, timetracker: timetracker} do
      conn = put conn, timetracker_path(conn, :update, timetracker), timetracker: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete timetracker" do
    setup [:create_timetracker]

    test "deletes chosen timetracker", %{conn: conn, timetracker: timetracker} do
      conn = delete conn, timetracker_path(conn, :delete, timetracker)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, timetracker_path(conn, :show, timetracker)
      end
    end
  end

  defp create_timetracker(_) do
    timetracker = fixture(:timetracker)
    {:ok, timetracker: timetracker}
  end
end
