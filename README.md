Data Matrix
=========

[![Build Status](https://travis-ci.org/apache/incubator-superset.svg?branch=master)](https://travis-ci.org/apache/incubator-superset)
[![PyPI version](https://badge.fury.io/py/apache-superset.svg)](https://badge.fury.io/py/apache-superset)
[![Coverage Status](https://codecov.io/github/apache/incubator-superset/coverage.svg?branch=master)](https://codecov.io/github/apache/incubator-superset)
[![PyPI](https://img.shields.io/pypi/pyversions/apache-superset.svg?maxAge=2592000)](https://pypi.python.org/pypi/apache-superset)
[![Get on Slack](https://img.shields.io/badge/slack-join-orange.svg)](https://join.slack.com/t/apache-superset/shared_invite/enQtNDMxMDY5NjM4MDU0LWJmOTcxYjlhZTRhYmEyYTMzOWYxOWEwMjcwZDZiNWRiNDY2NDUwNzcwMDFhNzE1ZmMxZTZlZWY0ZTQ2MzMyNTU)
[![Documentation](https://img.shields.io/badge/docs-apache.org-blue.svg)](https://superset.incubator.apache.org)
[![dependencies Status](https://david-dm.org/apache/incubator-superset/status.svg?path=superset/assets)](https://david-dm.org/apache/incubator-superset?path=superset/assets)

### 0.简介
##### 0.1 基础介绍
* 代码版本为superset 0.999.0dev，系统环境为CentOS7，前端已编译。
* 安装依赖库
* Python，测试过的有python3.6.9和python3.7.4，都可以
* Virtualenv--服务器环境可省略
* Npm(nodejs)
* Gunicorn
* Nginx--option，之前安装时没有使用

[Apache Superset (incubating) Github](https://github.com/apache/incubator-superset/tree/master)

##### 0.2 基础安装
安装依赖库
~~~~
yum upgrade python-setuptools
yum install gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel libsasl2-devel openldap-devel
yum groupinstall "Development tools"
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
~~~~

安装python
~~~~python
#yum安装
yum update -y
yum install -y python3

#or
#source安装，python版本查询https://www.python.org/ftp/python/
curl -O https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
tar -xzf Python-3.7.4.tgz
cd Python-3.7.4/
./configure --enable-optimizations
make altinstall
~~~~

安装Virtualenv
~~~~python
pip3 install virtualenv
~~~~

安装npm
~~~~python
#yum安装
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install nodejs

node --version
npm --version
~~~~

安装Gunicorn
~~~~python
#use easy_install安装
yum install python-setuptools
easy_install gunicorn

#or
#pip安装
pip3 install gunicorn
~~~~

安装Nginx
~~~~python
cd /home/
yum install -y wget #有则无需安装
wget http://nginx.org/download/nginx-1.13.7.tar.gz
tar -zxvf nginx-1.13.7.tar.gz
./configure
make
make install
#nginx一般默认安装好的路径为/usr/local/nginx
~~~~

### 1.拉取Master代码
~~~~python
git clone git@gitlab.veevadev.com:veevaorion/datamatrix.git
#or
git clone https://gitlab.veevadev.com/veevaorion/datamatrix.git
~~~~

### 2.创建虚拟环境
~~~~python
#进入工作路径
python3 -m virtualenv supersetenv #创建
source ./supersetenv/bin/activate #激活
~~~~

### 3.安装
进入datamatrix路径
##### 3.1 安装依赖
~~~~python
#进入datamatrix
pip3 install -r requirements.txt
pip3 install -r requirements-dev.txt
pip3 install -e . # 安装 superset开发者模式

#连接mysql数据库时安装
pip3 install mysqlclient
pip3 install pymysql

#使用gunicorn时安装
pip3 install gevent
~~~~

##### 3.2 初始化数据库
~~~~python
#创建admin账号
flask fab create-admin
# Username = admin
# User first name = admin
# User last name = user 
# Email = admin@fab.org
# Password = 123456

#修改为mysql数据库
#config.py文件
SQLALCHEMY_DATABASE_URI = 'mysql://root:password@localhost:3306/superset?charset=utf8mb4'

#修改一下sqlalchemy配置文件，进入venv/lib/python3.7/site-packages/sqlalchemy/dialects/__init__.py，增加两行
import pymysql 
pymysql.install_as_MySQLdb()

#初始化数据库
superset db upgrade 
superset init
#superset load_examples 不需要superset本身案例时可不运行
#如果数据库有修改则需要migrate，然后再次初始化
#superset migrate
#superset db upgrade
#superset init
~~~~

##### 3.3 编译前端代码--无需编译则跳过
进入前端文件路径/datamatrix/superset/asset
~~~~python
npm install
npm run build #或npm run dev
~~~~

##### 3.4 运行测试
进入/datamatrix/superset路径
~~~~python
FLASK_ENV=development flask run -h 0.0.0.0 -p 8088 --with-threads
~~~~

##### 3.5 Gunicorn后台启动
~~~~python
gunicorn \
      -w 10 \
      -k gevent \
      --timeout 120 \
      -D -b  0.0.0.0:8088 \
      --limit-request-line 0 \
      --limit-request-field_size 0 \
      --statsd-host localhost:8125 \
      "superset.app:create_app()"
~~~~

### 4.Redis
~~~~python
#添加到config.py，已添加
import redis 
CACHE_DEFAULT_TIMEOUT = 60 * 60 * 24
CACHE_CONFIG = {
'CACHE_TYPE': 'redis',
'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
'CACHE_KEY_PREFIX': 'superset_results',
'CACHE_REDIS_URL': 'redis://0.0.0.0:6379',
}
~~~~

### 5.其他
##### 打开防火墙
~~~~linux
sudo firewall-cmd --zone=public --add-port=8000/tcp --permanent
sudo firewall-cmd --reload
~~~~