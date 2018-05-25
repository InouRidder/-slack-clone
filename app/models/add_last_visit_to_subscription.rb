class AddLastVisitToSubscriptions < ApplicationRecord
  add_column :subscriptions, :last_visit, :datetime
end
