<?php

namespace App\Controller;

use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Config;
use App\Entity\User;
use Firebase\JWT\JWT;

class UserController extends AbstractController
{
    const APP_SECRET = 'nge1Sequee';

    /**
     * @Route("/user/register", name="user_register", methods={ "POST" })
     */
    public function register(Request $request)
    {
        $status = 'ok';
        $token = '';

        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to your action' => 'index(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();
        $payload = json_decode($request->getContent(), true);

        if ($payload['email'] && $payload['password']) {
            $repository = $this->getDoctrine()->getRepository(User::class);

            if ($repository->findOneBy([ 'login' => $payload['email'] ]) === null) {
                $user = new User();

                $user->setLogin($payload['email']);
                $user->setPassword(md5($payload['password']));
                $user->setSettings('');

                // tell Doctrine you want to (eventually) save the Product (no queries yet)
                $entityManager->persist($user);

                // actually executes the queries (i.e. the INSERT query)
                try {
                    $entityManager->flush();

                    $usr = new \stdClass();
                    $usr->login = $payload['email'];
                    $usr->settings = '';

                    $token = JWT::encode($usr, self::APP_SECRET);
                } catch (Doctrine\ORM\ORMException $e)
                {
                    $status = 'exception: ' . $e->getMessage();
                }
            } else {
                $status = 'exists';
            }
        } else {
            $status = 'no json';
        }

        $response = new JsonResponse([
            'status' => $status,
            'token' => $token,
        ], JsonResponse::HTTP_OK, [
            'Access-Control-Allow-Origin' => '*',
            'Content-Type' => 'application/json; charset=UTF-8',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Max-Age' => '3600',
            'Access-Control-Allow-Headers' => 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        ]);

        return $response;
    }

    /**
     * @Route("/user/auth", name="user_auth", methods={ "POST" })
     */
    public function authenticate(Request $request)
    {
        $status = 'ok';
        $token = '';

        $payload = json_decode($request->getContent(), true);

        if ($payload['email'] && $payload['password']) {
            $repository = $this->getDoctrine()->getRepository(User::class);

            if (($user = $repository->findOneBy([ 'login' => $payload['email'] ])) === null) {
                $status = 'wrong login';
            } else {
                if (md5($payload['password']) === $user->getPassword()) {
                    $usr = new \stdClass();
                    $usr->login = $user->getLogin();
                    $usr->settings = $user->getSettings();

                    $token = JWT::encode($usr, self::APP_SECRET);
                } else {
                    $status = 'wrong password';
                }
            }
        } else {
            $status = 'no json';
        }

        $response = new JsonResponse([
            'status' => $status,
            'token' => $token,
        ], JsonResponse::HTTP_CREATED, [
            'Access-Control-Allow-Origin' => '*',
            'Content-Type' => 'application/json; charset=UTF-8',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Max-Age' => '3600',
            'Access-Control-Allow-Headers' => 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        ]);

        return $response;

    }

    protected function isUserAuth(Request $request) {
//        $headers = $request->headers->all();
//        $this->dump($headers, 'HEADERS');
        $auth = $request->headers->get('authorization');
//        return $this->flushJson(JsonResponse::HTTP_OK, 'jwt=' . print_r($auth, 1));
//        $this->dump($auth, 'AUTH');
  //      die;
        list($jwt) = sscanf($auth, 'Bearer %s');
           //     $user_json = JWT::decode($jwt, self::APP_SECRET, [ 'HS256' ]));
        if ($jwt) {
            try {
//                $user_json = JWT::decode($jwt);
//                $this->dump($jwt);
                $jwtUser = JWT::decode($jwt, self::APP_SECRET, [ 'HS256' ]);
//                $this->dump($jwtUser);
//                return $this->flushJson(JsonResponse::HTTP_OK, 'jwt=' . print_r($user_json, 1));
//                return $this->flushJson(JsonResponse::HTTP_OK, 'jwt=5555' . $jwt);
                $repository = $this->getDoctrine()->getRepository(User::class);
//                return $jwtUser->login;
                if (($user = $repository->findOneBy([ 'login' => $jwtUser->login ])) !== null)
                {
                    return $user;
                }
            } catch (\Exception $e) {
//                return $this->flushJson(JsonResponse::HTTP_OK, 'jwt=' . $e->getMessage());
                // Some error
            }
        }
//        return $this->flushJson(JsonResponse::HTTP_OK, 'jwt=455465');
        return false;
    }

    protected function buildJWTToken(User $user) {
        $usr = new \stdClass();

        $usr->login = $user->getLogin();
        $usr->settings = $user->getSettings();

        $token = JWT::encode($usr, self::APP_SECRET);

        return $token;
    }

    public const USER_API_RESULT_NO_ERROR = 'ok';

    protected function flushJson($http_code, $api_result = self::USER_API_RESULT_NO_ERROR, $user = null) {
        switch ($http_code) {
            case JsonResponse::HTTP_UNAUTHORIZED: {
                $json = [ 'status' => 'unauthorized' ]; // opStatus
                break;
            }
            case JsonResponse::HTTP_OK: {
                $json = [ 'status' => $api_result ];
                if ($user !== null) {
                    $token = $this->buildJWTToken($user);
                    $json['token'] = $token;
                }
                break;
            }
            default: {
                throw new \Exception();
            }
        }
        //$this->dump($json);
        $response = new JsonResponse($json, $http_code, [
            'Access-Control-Allow-Origin' => '*',
            'Content-Type' => ($http_code != JsonResponse::HTTP_OK) ?
                                'application/problem+json; charset=UTF-8' :
                                'application/json; charset=UTF-8',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Max-Age' => '3600',
            'Access-Control-Allow-Headers' => 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        ]);
        return $response;
    }

    public function dump($var, $str='')
    {
        ob_start();
        var_dump($var);
        $log = ob_get_clean();
        file_put_contents('debug.log', $str . ' ' . $log . PHP_EOL, FILE_APPEND);
    }

    /**
     * @Route("/user/avatar/upload", name="upload_avatar", methods={ "POST" })
     */
    public function uploadAvatar(Request $request) {
//        $request = $this->getRequest();
//        $user = $this->isUserAuth($request);
//        $this->dump($user);
        if (($user = $this->isUserAuth($request)) != false) {
            //return $user;
            $this->dump($user, 'user = ');
//            return $this->flushJson(JsonResponse::HTTP_OK, print_r($user->getLogin(), 1));
            $payload = $request->getContent();
            if ($payload)
            {
//                return $this->flushJson(JsonResponse::HTTP_OK, 'fgrt=' . $payload);
//                return $this->flushJson(JsonResponse::HTTP_OK, $request->getContent());
//                var_dump($payload);
                $user->setAvatar($payload);
//                return $this->flushJson(JsonResponse::HTTP_OK, $payload);
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                try {
                    $entityManager->flush();
                    return $this->flushJson(JsonResponse::HTTP_OK, 'ok', $user);
                } catch (Doctrine\ORM\ORMException $e) {
                    return $this->flushJson(JsonResponse::HTTP_OK, 'exception: ' . $e->getMessage());
                }
            }
        }
        return $this->flushJson(JsonResponse::HTTP_UNAUTHORIZED);
    }
}
