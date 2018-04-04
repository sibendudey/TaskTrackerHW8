defmodule TasktrackerWeb.TimetrackerView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TimetrackerView

  def render("index.json", %{timetrackers: timetrackers}) do
    %{data: render_many(timetrackers, TimetrackerView, "timetracker.json")}
  end

  def render("show.json", %{timetracker: timetracker}) do
    %{data: render_one(timetracker, TimetrackerView, "timetracker.json")}
  end

  def render("timetracker.json", %{timetracker: timetracker}) do
    %{id: timetracker.id,
      time: timetracker.time}
  end
end
