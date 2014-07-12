# coding: utf-8
Admin.mailer :welcome do

  email :confirm do |cid|
    @conflict = Conflict.find cid
    @account = @conflict.account
    from $sitemail
    to @account.email
    #to 'ejoltmap@gmail.com'
    subject "Welcome"
    content_type :html
    body render 'confirm'
    via :smtp
  end

  email :confirm_account do |aid|
    @account = Account.find aid
    from $sitemail
    #pretty_name '#dirençevre'
    to @account.email
    #to 'ejoltmap@gmail.com'
    subject "Welcome"
    content_type :html
    body render 'confirm'
    via :smtp
  end

  email :invite do |aid|
    @account = Account.find aid
    from $sitemail
    #pretty_name '#dirençevre'
    to @account.email
    #to 'ejoltmap@gmail.com'
    subject "Welcome to the new EJOLT Atlas"
    content_type :html
    body render 'invite'
    via :smtp
  end
end

Admin.mailer :password do
  email :reset do |aid|
    @account = Account.find aid
    from $sitemail
    #pretty_name '#dirençevre'
    to @account.email
    #to 'ejoltmap@gmail.com'
    subject "Password reset"
    content_type :html
    body render 'reset'
    via :smtp
  end
end
