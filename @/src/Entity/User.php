<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="login", type="string", length=127)
     */
    private $login;

    /**
     * @ORM\Column(name="password", type="string", length=127)
     */
    private $password;

    /**
     * @ORM\Column(name="settings", type="text")
     */
    private $settings;

    public function getId(): ?int
    {
        return $this->id;
    }

}
