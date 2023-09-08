let all_courses = [
  {
    id: "123",
    name: "Pharmacology",
    image: "drugs.jpg",
    description:
      "A branch of medicine that deals with the drugsnused tomtreat various conditions",
    learners: 400,
    rating: 4,
    topics: {
      0: {
        title: "Anti diabetic drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      1: {
        title: "Anti Hypertensive drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      2: {
        title: "Anti Cholinergic drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      3: {
        title: "Anti Malarial drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      4: {
        title: "Anti Viral drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      5: {
        title: "Anti Retroviral drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      6: {
        title: "Anti Arrhythmia drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      7: {
        title: "Anti Tussive drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      8: {
        title: "Anti Rheumatic drugs",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      9: {
        title: "Drugs for heart failure",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
      10: {
        title: "Drugs for infertility",
        description:
          "The failing heart evokes three major compensatory mechanisms to enhance cardiac output (Figure 19.4). Although initially beneficial, these alterations ultimately result in further deterioration of cardiac function.",
      },
    },
  },
  {
    id: "1234",
    name: "Instruments",
    image: "stethoscope.png",
    description: "Learn all the instruments used in the hospital",
    learners: 500,
    rating: 4,
    topics: {
      0: {
        title: "General instruments",
        description: "Most commonly used instruments",
        pdf_url: "Url of pdf",
      },
      1: {
        title: "Surgical instruments",
        description: "Instruments used in the operation room during surgery",
        pdf_url: "Url of pdf",
      },
      2: {
        title: "Obstetric instruments",
        description: "Instruments used for obstetrics examinations",
        pdf_url: "Url of pdf",
      },
    },
  },
  {
    id: "12345",
    name: "Anatomy",
    image: "anatomy.jpg",
    description: "Learn all about the human body in detail",
    learners: 80,
    rating: 4,
    topics: {
      0: {
        title: "Digestive system",
        description: "A system comprising of organs that process what we eat",
        pdf_url: "Url of pdf",
      },
      1: {
        title: "Endocrine system",
        description: "A system comprising of organs that release hormones",
        pdf_url: "Url of pdf",
      },
      2: {
        title: "Circulatory  system",
        description:
          "A system comprising of the heart, blood vessels and blood",
        pdf_url: "Url of pdf",
      },
      3: {
        title: "Renal system",
        description:
          "A system comprising of kidneys, and how urine is excreted",
        pdf_url: "Url of pdf",
      },
    },
  },
  {
    id: "123456",
    name: "Nutrition",
    image: "nutrition.png",
    description:
      "All about therapeutic foods and how to detect and manage all forms of malnutrition",
    learners: 90,
    rating: 4,
    topics: {
      0: {
        title: "Digestive system",
        description: "A system comprising of organs that process what we eat",
        pdf_url: "Url of pdf",
      },
      1: {
        title: "Endocrine system",
        description: "A system comprising of organs that release hormones",
        pdf_url: "Url of pdf",
      },
      2: {
        title: "Circulatory  system",
        description:
          "A system comprising of the heart, blood vessels and blood",
        pdf_url: "Url of pdf",
      },
      3: {
        title: "Renal system",
        description:
          "A system comprising of kidneys, and how urine is excreted",
        pdf_url: "Url of pdf",
      },
    },
  },
  {
    id: "123457",
    name: "First Aid",
    image: "first-aid-box.png",
    description:
      "The immediate care/management of various conditions before hospitalization",
    learners: 95,
    rating: 4,
    topics: {
      0: {
        title: "Digestive system",
        description: "A system comprising of organs that process what we eat",
        pdf_url: "Url of pdf",
      },
      1: {
        title: "Endocrine system",
        description: "A system comprising of organs that release hormones",
        pdf_url: "Url of pdf",
      },
      2: {
        title: "Circulatory  system",
        description:
          "A system comprising of the heart, blood vessels and blood",
        pdf_url: "Url of pdf",
      },
      3: {
        title: "Renal system",
        description:
          "A system comprising of kidneys, and how urine is excreted",
        pdf_url: "Url of pdf",
      },
    },
  },
];

let all_users = [
  {
    uid: "uid_1",
    name: "John Doe",
    status: "Premium",
    moderator: true,
    email: "johndoe@gmail.com",
    password: "some",
    xps: 2000,
    followers: ["aaron", "snowden", "joel", "Lisa", "Aaron Kibuuka"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_2",
    name: "Brian Smith",
    status: "Free",
    moderator: false,
    email: "email",
    password: "some_password",
    xps: 5000,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_3",
    name: "Aaron Jack",
    status: "Free",
    moderator: false,
    email: "email",
    password: "some_password",
    xps: 8000,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_4",
    name: "Benjamin Mocke",
    status: "Free",
    moderator: false,
    email: "email",
    password: "some_password",
    xps: 1500,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_5",
    name: "Stacy Taylor",
    status: "Free",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 3500,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_6",
    name: "Sarah Trainor",
    status: "Premium",
    moderator: false,
    email: "email",
    password: "some_password",
    xps: 4500,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_7",
    name: "Aquram Ssali",
    status: "Premium",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 5300,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_8",
    name: "Ibrahim K",
    status: "Premium",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 6500,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_9",
    name: "Aaron Kibuuka",
    status: "Premium",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 7000,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_10",
    name: "Simon Peter",
    status: "Premium",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 1600,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_11",
    name: "Peter Joe",
    status: "Free",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 3900,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_12",
    name: "Joshua Park",
    status: "Free",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 4700,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_13",
    name: "Jane Dane",
    status: "Free",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 6300,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_14",
    name: "Stuart Bell",
    status: "Free",
    moderator: false,
    email: "email",
    password: "some_password",
    xps: 7800,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_15",
    name: "Brian John",
    status: "Free",
    moderator: true,
    email: "email",
    password: "some_password",
    xps: 8800,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_16",
    name: "Ceaser Kibumba",
    status: "Premium",
    moderator: true,
    email: "ceaserk@gmail.com",
    password: "some_pass",
    xps: 8800,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
  {
    uid: "uid_17",
    name: "Aaron Kibuuka",
    status: "Premium",
    moderator: true,
    email: "aaronkibuuka@gmail.com",
    password: "some_pass",
    xps: 8800,
    followers: ["aaron", "snowden", "joel", "Lisa"],
    followees: ["John", "Jane", "Smith"],
  },
];

let all_videos = [
  {
    vid: "1",
    url: "video_url",
    course: "Pharmacology",
    thumbnail: "assets/showcase.jpg",
    title: "This is a video contains pharmacology contents",
    rating: 5,
  },
  {
    vid: "2",
    url: "video_url",
    course: "Instruments",
    thumbnail: "assets/showcase.jpg",
    title: "This is a video contains instruments contents",
    rating: 5,
  },
  {
    vid: "3",
    url: "video_url",
    course: "Anatomy",
    thumbnail: "assets/showcase.jpg",
    title: "This is a video contains anatomy contents",
    rating: 5,
  },
];

let all_books = [
  {
    title: "Anatomy And Physiology",
    image: "anatomy-totora.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "DSM v",
    image: "dsm-5.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Palliative care",
    image: "palliative-care.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Robbins pathology",
    image: "robbins.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Lippincott's pharmacology",
    image: "lippincot.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Uganda Clinical Guidelines",
    image: "UCG.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Uganda Clinical Guidelines",
    image: "UCG.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
  {
    title: "Uganda Clinical Guidelines",
    image: "UCG.png",
    description: "some description about the book",
    book_url: "storage bucket url for pdf",
  },
];

let all_challenges = [];

let all_comments = [
  {
    id: "comment-id",
    commentor: "John Doe",
    message: "This is the comment from the user",
    course: "Anatomy",
    dateAndTime: "14/July/2023 at 13:00",
  },
  {
    id: "comment-id",
    commentor: "Smith Jones",
    message: "This is the comment from the Jones",
    course: "Anatomy",
    dateAndTime: "14/July/2023 at 13:00",
  },
  {
    id: "comment-id",
    commentor: "Aaron Kibuuka",
    message: "This is the comment from the Aaron",
    course: "Pharmacology",
    dateAndTime: "14/July/2023 at 13:00",
  },
];

let all_feedback = [];

exports.app_data = () => {
  return {
    all_courses,
    all_users,
    all_videos,
    all_books,
    all_challenges,
    all_comments,
    all_feedback,
  };
};
