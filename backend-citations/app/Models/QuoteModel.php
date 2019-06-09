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
     * Insert new Quote in table
     * @return booleen
     */
    public function insert()
    {
        // Requête SQL
        $sql = '
            INSERT INTO `quote`(name, content)
            VALUES (:name, :content);
        ';

        $Dbdata = new Database();
        $pdoStatement = $Dbdata->pdo->prepare($sql);

        $pdoStatement->bindValue(':name', $this->getName(), PDO::PARAM_STR);
        $pdoStatement->bindValue(':content', $this->getContent(), PDO::PARAM_STR);

        $pdoStatement->execute();

        // On récupère le nb de ligne affecté par la modification pour vérification
        $affectedRow = $pdoStatement->rowCount();

        // On teste si le nb de ligne affecté = 1, et on renvoie un statu de réponse
        if($affectedRow === 1) {
            $status = true;
        } else {
            $status = false;
        }

        return $status;

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
        $this->name = $name;

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