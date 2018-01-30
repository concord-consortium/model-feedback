"use strict";
exports.__esModule = true;
exports.Model = "\n{\n  \"factors\": [\n    {\"label\": \"f_n1\", \"description\": \"Number many times water droplets have been followed.\", \"type\": \"Count\"},\n    {\"label\": \"f_t1\", \"description\": \"How long the student spent following water droplets.\", \"type\": \"Timer\"},\n    {\"label\": \"m_n1\", \"description\": \"Number of times the model has been run\", \"type\": \"Count\"},\n    {\"label\": \"m_t1\", \"description\": \"Model run-time in seconds\", \"type\": \"Timer\"}\n  ],\n  \"conditions\": [\n    {\"label\": \"C0\", \"factor\": \"f_n1\", \"expression\": \"< \", \"value\": 1,   \"yes\": \"MF_F1\",     \"no\": \"C1\"},\n    {\"label\": \"C1\", \"factor\": \"f_t1\", \"expression\": \"<\",  \"value\": 5,   \"yes\": \"MF_F1\",     \"no\": \"C2\"},\n    {\"label\": \"C2\", \"factor\": \"f_t1\", \"expression\": \"<=\", \"value\": 200, \"yes\": \"C3\",        \"no\": \"C4\"},\n    {\"label\": \"C3\", \"factor\": \"f_n1\", \"expression\": \"< \", \"value\": 3,   \"yes\": \"MF_F2_F3\",  \"no\": \"MF_F3\"},\n    {\"label\": \"C4\", \"factor\": \"f_n1\", \"expression\": \"< \", \"value\": 3,   \"yes\": \"MF_F2\",     \"no\": \"NONE\"}\n  ],\n  \"results\": [\n    {\"label\": \"MF_F1\",    \"score\": 1, \"feedback\": \"It looks like you didn't follow any water droplets! Use the 'Follow water droplet' button to follow several water droplets in the model.\"},\n    {\"label\": \"MF_F2\",    \"score\": 2, \"feedback\": \"It looks like you didn't follow enough water droplets. Follow a few more water droplets.\"},\n    {\"label\": \"MF_F2_F3\", \"score\": 3, \"feedback\": \"It looks like you didn't follow enough water droplets. Follow a few more water droplets. It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer..\"},\n    {\"label\": \"MF_F3\",    \"score\": 4, \"feedback\": \"It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer..\"},\n    {\"label\": \"NONE\",     \"score\": 5, \"feedback\": \"\"}\n  ]\n}\n";
