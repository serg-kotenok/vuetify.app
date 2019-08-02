<?php

namespace App\Controller;

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
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to your action: index(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();
        $payload = json_decode($request->getContent(), true);

        if ($payload['login'] && $payload['password']) {
            $repository = $this->getDoctrine()->getRepository(User::class);

            if ($repository->findOneBy([ 'login' => $payload['login'] ]) === null) {
                $user = new User();
                $user->setLogin($payload['login']);
                $user->setPassword(md5($payload['password']));
                $user->setSettings('');

                // tell Doctrine you want to (eventually) save the Product (no queries yet)
                $entityManager->persist($user);

                // actually executes the queries (i.e. the INSERT query)
                try {
                    $entityManager->flush();

                    $user = new \stdClass();
                    $user->login = $payload['login'];
                    $user->settings = '';

                    $response = new JsonResponse([
                        'status' => 'ok',
                        'user' => $user,
                        'token' => JWT::encode($user, self::APP_SECRET)
                    ], JsonResponse::HTTP_CREATED);

                } catch (\Exception $e) {
                    $response = new JsonResponse([
                        'status' => 'exception',
                        'reason' => $e->toString()
                    ], JsonResponse::HTTP_CREATED);
                }
            } else {
                $response = new JsonResponse([
                    'status' => 'exists',
                ],JsonResponse::HTTP_CREATED);

            }
        } else {
            throw new NotFoundHttpException('No JSON input!');
        }

        return $response;
    }

    public function authenticate(Request $request)
    {
        $status = '';
        $token = '';

        $payload = json_decode($request->getContent(), true);

        if ($payload['login'] && $payload['password']) {
            $repository = $this->getDoctrine()->getRepository(User::class);

            if (($user = $repository->findOneBy([ 'login' => $payload['login'] ])) === null) {
                $status = 'wrong login';
            } else {
                if (md5($payload['password']) === $user->getPassword()) {
                    $status = 'ok';

                    $usr = new \stdClass();
                    $usr->login = $user->getLogin();
                    $usr->settings = $user->getSettings();

                    $token = JWT::encode($usr, self::APP_SECRET);
                } else {
                    $status = 'wrong password';
                }
            }
        } else {
            $status = 'no json in input';
        }

        $response = new JsonResponse([
            'status' => $status,
            'token' => $token,
        ], JsonResponse::HTTP_CREATED);

        return $response;

    }
}
