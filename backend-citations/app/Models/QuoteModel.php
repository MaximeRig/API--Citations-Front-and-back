<?php

namespace quotes\Models;

use quotes\Utils\Database;
use \PDO;
use \jsonSerializable;

class QuoteModel extends CoreModel implements jsonSerializable
{

    private $name;
    private $content;

    /**
     * Display all the quotes
     * @return QuoteModel[]
     */
    public function findAll()
    {
        // Requête sql
        $sql = '
        SELECT *
        FROM quote';

        $DBData = new Database();

        $pdoStatement = $DBData->pdo->query($sql);

        $quoteCollection = $pdoStatement->fetchAll(PDO::FETCH_CLASS, 'quotes\\Models\\QuoteModel');

        return $quoteCollection;
    }

    /**
     * Get the value of content
     */ 
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set the value of content
     *
     * @return  self
     */ 
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get the value of autho_id
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of autho_id
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->author_id = $name;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'content' => $this->getContent()
        ];
    }
}