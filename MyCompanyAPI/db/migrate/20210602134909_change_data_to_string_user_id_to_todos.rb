class ChangeDataToStringUserIdToTodos < ActiveRecord::Migration[6.0]
  def change
    change_column :todos, :user_id, :string
  end
end
