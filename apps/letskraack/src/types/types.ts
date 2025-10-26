import { Dispatch, SetStateAction } from 'react';

export type UserDetails = {
  id?: string;
  name?: string;
  email?: string;
};

export type UserDetailsContextType = {
    userDetail: UserDetails;
    setUserDetail: Dispatch<SetStateAction<UserDetails>>;
};

export type SelectedChapterIndexContextType = {
    selectedChapterIndex: number;
    setSelectedChapterIndex: Dispatch<SetStateAction<number>>;
};

export type CourseContent = 
  {
  "kind": "youtube#searchListResponse",
  "etag": "R4xTp5kBv9aaHepMyHjlHFYTF9c",
  "nextPageToken": "CAQQAA",
  "regionCode": "NL",
  "pageInfo": {
    "totalResults": 40508,
    "resultsPerPage": 4
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "keEMBtYrbLe6B_Liau7xIaFez70",
      "id": {
        "kind": "youtube#video",
        "videoId": "LSEYdU8Dp9Y"
      },
      "snippet": {
        "publishedAt": "2022-12-12T20:24:48Z",
        "channelId": "UCHd1qamEkVSlTWkEqIqJbEQ",
        "title": "What is Spring-Boot Framework? (explained from scratch)",
        "description": "Hey everyone and welcome back! In this video we're going to learn what is Spring-Boot framework and how you can create a ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/LSEYdU8Dp9Y/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/LSEYdU8Dp9Y/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/LSEYdU8Dp9Y/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Visual Computer Science",
        "liveBroadcastContent": "none",
        "publishTime": "2022-12-12T20:24:48Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "hpJ_bET_JVJp8nUQx0VY7fzBlAQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "gJrjgg1KVL4"
      },
      "snippet": {
        "publishedAt": "2025-02-26T12:30:48Z",
        "channelId": "UCWv7vMbMWH4-V0ZXdmDpPBA",
        "title": "Spring Boot Tutorial for Beginners [2025]",
        "description": "Master Spring Boot and build amazing backends with Java! This beginner-friendly tutorial covers everything you need to learn ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gJrjgg1KVL4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gJrjgg1KVL4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gJrjgg1KVL4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Programming with Mosh",
        "liveBroadcastContent": "none",
        "publishTime": "2025-02-26T12:30:48Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "4gzT9MmNp3QGnrfzr94Q7INheUM",
      "id": {
        "kind": "youtube#video",
        "videoId": "RRubcjpTkks"
      },
      "snippet": {
        "publishedAt": "2019-04-18T15:57:44Z",
        "channelId": "UC_fFL5jgoCOrwAVoM_fBYwA",
        "title": "Learn Java in 14 Minutes (seriously)",
        "description": "OFF ANY Springboard Tech Bootcamps with my code ALEXLEE. See if you qualify for the JOB GUARANTEE!",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/RRubcjpTkks/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/RRubcjpTkks/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/RRubcjpTkks/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Alex Lee",
        "liveBroadcastContent": "none",
        "publishTime": "2019-04-18T15:57:44Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "HPuJg9-kxVhaU-gZ2lWVN95oEh4",
      "id": {
        "kind": "youtube#video",
        "videoId": "UoR6PtWEpxY"
      },
      "snippet": {
        "publishedAt": "2024-06-24T13:51:24Z",
        "channelId": "UC-ZZjHr4nl5t32pFl3Sqf0A",
        "title": "Java spring boot roadmap | #springframework #springboot #job #placement #engineering",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/UoR6PtWEpxY/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/UoR6PtWEpxY/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/UoR6PtWEpxY/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Genie Ashwani",
        "liveBroadcastContent": "none",
        "publishTime": "2024-06-24T13:51:24Z"
      }
    }
  ]
}

