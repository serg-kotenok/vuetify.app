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
     * @ORM\Column(name="login", type="string", length=50)
     */
    private $login;

    /**
     * @ORM\Column(name="password", type="string", length=32)
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

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getSettings(): ?string
    {
        return $this->settings;
    }

    public function setSettings(string $settings): self
    {
        $this->settings = $settings;

        return $this;
    }

    public function setAvatar($avatar)
    {
        $settings = $this->getSettings();
        $settings_assoc = ($settings !== '') ? unserialize(base64_decode($settings)) : [];
        $settings_assoc['avatar'] = $avatar;
        $coded_settings = base64_encode(serialize($settings_assoc));
        $this->setSettings($coded_settings);

        return $this;
    }

}
