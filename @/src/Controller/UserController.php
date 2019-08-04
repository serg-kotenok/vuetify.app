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
}
