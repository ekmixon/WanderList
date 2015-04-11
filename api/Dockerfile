FROM centos:latest
RUN yum install -y gcc
RUN yum install -y make
RUN yum install -y automake
RUN yum install -y autoconf
RUN yum install -y curl-devel
RUN yum install -y openssl-devel
RUN yum install -y zlib-devel
RUN yum install -y httpd-devel
RUN yum install -y apr-devel
RUN yum install -y apr-util-devel
RUN yum install -y ruby-devel
RUN gem install bundler
COPY ["Gemfile","/usr/src/api/" ]
COPY ["Gemfile.lock","/usr/src/api/" ]
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum install -y --skip-broken npm
WORKDIR /usr/src/api
RUN bundle install
COPY ["cron.sh", "/usr/src/api/" ]
CMD bash cron.sh
