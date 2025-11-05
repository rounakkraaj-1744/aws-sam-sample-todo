export interface Todo {
    id: String,
    title?: String,
    description?: String,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface InputTodo {
    title: String,
    description: String
}

export interface UpdateTodo {
    title?: string;
    description?: string;
    completed?: boolean;
}