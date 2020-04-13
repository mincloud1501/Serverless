# Serverless


### IaaS (Infrastructure as a Service)

- AWS, Azure 등의 서비스가 만들어지기 시작하여 더 이상 서버자원, 네트워크, 전력 등의 인프라를 모두 직접 구축할 필요가 없어졌다. 이러한 `인프라를 가상화`하여 관리하기 쉽게 해주는 서비스 서비스를 통하여, 관리자 패널에서 인프라를 구성하고 사용하고. 사용자는 가상머신을 만들고, 네트워크를 설정하고, 하드웨어도 설정하고, 거기에 운영체제를 설치해서 애플리케이션을 구동할 수 있다. 또한 사용량을 쉽게 모니터링 할 수 있다.

### PaaS (Platform as a Service)

- IaaS 보다 더 추상화된 모델로써 `Network 및 Runtime 제공`이 된다. 사용자는 애플리케이션만 배포하면 바로 구동시킬 수 있는 서비스 이다. 대표적으로 AWS Elastic Beanstalk, Azure App Services 등이 있으며, 이를 사용하면 Auto Scaling 및 Load Balancing도 쉽게 적용 할 수 있다.

![concept](images/concept.png)

---

- Serverless는 서버가 없다는 의미로 보통 `Serverless Computing` 또는 `Serverless Architecture`로 불린다. Serverless 개념은 application 관점에서 `BaaS`와 `FaaS`로 나누어 살펴보면 이해가 더 용이하다.

[![Sources](https://img.shields.io/badge/출처-martinfowler-yellow)](https://martinfowler.com/articles/serverless.html)
[![Sources](https://img.shields.io/badge/출처-serverless-yellow)](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9)

![traditional_vs_serverless](images/traditional_vs_serverless.png)

### BaaS (Backend as a Service) - ex) Firebase

- 백엔드 서버 개발을 하다보면, 서버의 확장도 고려해야 하고, 보안성 또한 고려해야 하는데, 앱 개발에 있어서 필요한 다양한 기능들 (데이터베이스, 소셜서비스 연동, 파일시스템 등)을 API로 제공해 줌으로써, 개발자들이 서버 개발을 하지 않고서도 필요한 기능을 쉽고 빠르게 구현 할 수 있게 해주고, 비용은 사용 한 만큼 지불하는 형태의 서비스를 말한다.
- BaaS를 사용함으로서, 발생하는 대표적인 단점으로는 백엔드 로직들이 클라이언트쪽에 구현이 되며, 앱의 규모가 커질수록 비용이 들고, 복잡한 query가 불가능하다.


### FaaS (Function as a Service)

![vendor](images/vendor.png)

- FaaS는 프로젝트를 여러개의 함수로 쪼개서 (혹은 한개의 함수로 만들어서), 매우 거대하고 분산된 컴퓨팅 자원에 여러분이 준비해둔 함수를 등록하고, 이 함수들이 실행되는 횟수 (그리고 실행된 시간) 만큼 비용을 내는 방식을 말한다.
- 서버 시스템에 대해서 신경쓰지 않아도 된다는 점이 PaaS 와 유사하지만, PaaS 의 경우엔, `전체 Application`을 배포하며, 일단 어떠한 서버에서 애플리케이션이 24시간동안 계속 돌아가는 반면에
FaaS 는, application이 아닌 `함수(Function)`를 배포하며, 계속 실행되고 있는 것이 아닌 특정 이벤트가 발생 했을 때 실행되며, 실행이 되었다가 작업을 마치면 (또는 최대 timeout 시간을 지나면) 종료된다.

[장점]
- 함수가 호출된 만큼만 비용 지불한다.
- 인프라 구성 작업에 대해 신경 쓸 필요가 없다.
- 리눅스 업데이트, 취약점 보안패치 등에 대해 신경 쓸 필요가 없다.
- AWS의 Auto Scaling 같은 기술을 사용하여 다양한 트래픽에 유연한 대응이 가능하다.

[단점]
- 모든 코드를 함수로 쪼개서 작업하다 보니, 함수에서 사용할 수 있는 자원에 제한이 있다.
- FaaS 제공 업체에 강하게 의존할 수 밖에 없다.
- 함수들은 Stateless이기 때문에 로컬 데이터의 사용이 불가능하다. (AWS S2, Azure Storage 따로 사용하면 가능)


### ■ Pre-requisites (AWS Lambda)

- AWS account 생성 (https://portal.aws.amazon.com/)
- 결재정보 입력 : 확인 목적으로 1$ 결재 후, 몇일 지나면 자동 취소됨
- 2차 인증 처리 (Google OTP) : 해킹 등 보안을 목적으로 OTP 인증 절차 등록

![account](images/account.png)

■ new Lambda 만들기

- AWS에 로그인한 후, Lambda Management Console에 접속한다.

