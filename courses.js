const express = require("express");
const multer = require("multer");

const services = require("./config");
const db = services.db;
const storage = services.storage;

// Multer storage configuration
const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

module.exports = (options = {}) => {
  let courses = options.courses;

  const CoursesCollection = db.collection("Courses");

  const router = express.Router();

  // router.get("/courses", (req, res) => {
  //   let query = req.query;

  //   let payLoad = {};
  //   if (query.orderBy) {
  //     for (const [id, course] of Object.entries(courses)) {
  //       if (course[query.orderBy] === query.equalTo) {
  //         payLoad[id] = course;
  //       }
  //     }
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.json(payLoad);
  //   } else if (query.limit && query.offset) {
  //     for (let i = query.offset; i <= query.limit; i++) {
  //       payLoad[Object.keys(courses)[i]] = Object.values(courses)[i];
  //     }

  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.json(payLoad);
  //   } else if (query.limit) {
  //     for (let i = 0; i <= query.limit; i++) {
  //       payLoad[Object.keys(courses)[i]] = Object.values(courses)[i];
  //     }

  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.json(payLoad);
  //   } else {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.json(courses);
  //   }
  // });

  router.get("/courses", async (req, res) => {
    try {
      CoursesCollection.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.type("json").status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({
        general: "Something went wrong, please try again",
        errorMessage: error,
      });
    }
  });

  router.post(
    "/courses/uploadFile",
    upload.single("file"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file;
        const bucket = storage.bucket(); // Default Firebase Storage bucket

        // Upload the file to Firebase Cloud Storage
        const fileUpload = bucket.file(file.originalname);
        const blobStream = fileUpload.createWriteStream();
        blobStream.on("error", (error) => {
          console.error("Error uploading file:", error);
          return res.status(500).json({ error: "Failed to upload file" });
        });
        blobStream.on("finish", async () => {
          // Generate a storage URL for the uploaded file
          const storageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;

          return res
            .status(200)
            .json({ message: "File uploaded successfully", storageUrl });
        });
        blobStream.end(file.buffer);
      } catch (error) {
        console.error("Error handling upload:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  // add new topic
  router.post("/courses/uploadPdf", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const bucket = storage.bucket();
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      const fileBuffer = req.file.buffer;

      await file.save(fileBuffer);

      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
      return res.status(200).json({ fileUrl });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      return res.status(500).send("Error uploading PDF.");
    }
  });

  // add new course
  router.post("/courses", async (req, res) => {
    let newCourse = req.body;
    CoursesCollection.add(newCourse);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200);
  });

  // get a single course
  router.get("/courses/:id", (req, res) => {
    let courseId = req.params.id;
    const courseRef = CoursesCollection.doc(courseId);

    // Retrieve the document data
    courseRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          res.type("json").status(200).json(data);
        } else {
          res
            .status(404)
            .json({ general: "Something went wrong, please try again" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error,
        });
      });
  });

  // add a new topic
  router.post("/courses/:id", (req, res) => {
    let newTopic = req.body;
    let courseId = req.params.id;
    let course = CoursesCollection.doc(courseId);

    course
      .update({
        [`topics.${newTopic["key"]}`]: newTopic,
      })
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  });

  return router;
};

// delete topic
router.delete("/courses/topics/", (req, res) => {
  let courseId = req.body.courseId;
  let topicId = req.body.topicId;
  let filePath = req.body.filePath;

  // Specify the parent document and the nested document to delete
  const parentDocumentId = courseId;
  const nestedDocumentId = topicId;
  // Delete the nested document
  db.collection("Courses")
    .doc(parentDocumentId)
    .update({ [nestedDocumentId]: admin.firestore.FieldValue.delete() })
    .then(() => {
      console.log("Nested document successfully deleted");
      // delete the pdf file
      // Get a reference to the Cloud Storage bucket
      const bucket = storage.bucket(); // Specify the path to the file you want to delete

      bucket
        .file(filePath)
        .delete()
        .then(() => {
          res.status(200).send("File successfully deleted");
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
          res.status(500).send("Error deleting file");
        });
    })
    .catch((error) => {
      console.error("Error deleting nested document:", error);
      res.status(500).send("Error deleting file");
    });
});
