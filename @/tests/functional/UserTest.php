<?php namespace App\Tests;

use App\Entity\User;
use App\Kernel;
use App\Repository\UserRepository;
use Codeception\Test\Unit;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserTest extends KernelTestCase
{
    /**
     * @var \App\Tests\FunctionalTester
     */
    protected $tester;
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    protected function _before()
    {
    }

    protected function _after()
    {
    }

    public static function getKernelClass()
    {
        require_once dirname(__DIR__) . '/../config/bootstrap.php';
        return new Kernel($_SERVER['APP_ENV'], false);
    }

    // tests
    public function testSomeFeature()
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();

        $user = $this->entityManager->getRepository(User::class)
            ->findOneBy(['id' => 1]);

        $this->assertEquals(2, $user->getPassword(), "User's with id '1' password must be equals to '2'" . $user->getPassword());
    }
}
