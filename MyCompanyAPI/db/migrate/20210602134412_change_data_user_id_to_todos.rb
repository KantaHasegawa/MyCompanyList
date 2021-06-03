class ChangeDataUserIdToTodos < ActiveRecord::Migration[6.0]
  def change
    change_column :todos, :user_id, :bigint
  end
end
