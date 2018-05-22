Rails.application.routes.draw do

  devise_for :users
  root to: 'chat_rooms#index'
  resources :chat_rooms, only: [:show, :create] do
    resources :messages, only: [:create]
  end

  mount ActionCable.server => "/cable"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
