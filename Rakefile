# frozen_string_literal: true

require "rake"

desc "Build Vite React assets into assets/"
task :assets do
  sh "npm run build"
end

desc "Build assets then build Jekyll site"
task build: :assets do
  sh "bundle exec jekyll build"
end
