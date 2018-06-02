class CourseIndexQuery
  def initialize(params)
    @params = params
    @courses = Course.all.to_a
  end

  def call
    params.each do |key, value|
      eval(key)
    end
  end

  def cascade
  end

  private

  def location
  end

  def subjects
  end

end
