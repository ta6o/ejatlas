-# coding: utf-8
.row.wide
  .col-md-12
    .hero-unit
      %h1.title
        =mt('Companies to merge')
    .inner
      -@keywords.each do |k,v|
        -next unless v.any?
        .well
          %h3= k
          %ul
          -v.each do |s|
            %li
              %span=s[:name]
              &nbsp;
              %span=s[:count]
