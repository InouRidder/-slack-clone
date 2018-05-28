class AddLastVisitToSubscriptions < ApplicationRecord
  def change
    add_column :subscriptions, :last_visit, :datetime
  end
end
