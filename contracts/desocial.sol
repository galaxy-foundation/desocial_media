// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Forum {
    struct Article {
        account owner;
        string title;
        byte32 hash;
        uint followers;
        uint created;
    }

    Article[] articles;
    mapping(byte32=>uint) articleIds;

    constructor() {

    }

    function addBlog(title, hash) public {
        address _account = msg.sender;
        require(_account!=address(0), "ZERO ADDRESS");

        articles.push(Article({
            owner: _account,
            title: title,
            hash: hash,
            followers: 0;
            created: block.timestamp
        }));
    }
    
    function addBlog(title, hash) public {
        address _account = msg.sender;
        require(_account!=address(0), "ZERO ADDRESS");

        articles.push(Article({
            owner: _account,
            title: title,
            hash: hash,
            followers: 0;
            created: block.timestamp
        }));
    }

    
}