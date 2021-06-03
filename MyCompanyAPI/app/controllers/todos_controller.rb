class TodosController < SecuredController



  def index
    todos = Todo.where(user_id: params[:user_id])
    render status: 200, json:{message: 'success', data: todos}
  end

  def show
    if todo = Todo.find(params[:id])
      render status: 200, json:{message: 'success', data: todo}
    else
      render status: 404, json:{data: todo.errors}
  end
end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render status: 200, json: {data: todo }
    else
      render status: 500, json: {data: todo.errors}
    end
  end

  def destroy
    if todo = Todo.find(params[:id])
      if todo.destroy
        render status: 200, json: {data: todo}
      else
        render status: 500, json: {data: todo.errors}
      end
    else
      render status: 404, json: {data: todo.errors}
    end
  end

  def todo_params
    params.permit(
      :user_id,
      :name,
      :info
      )
  end
end
