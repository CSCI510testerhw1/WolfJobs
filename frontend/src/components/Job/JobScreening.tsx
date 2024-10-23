import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const JobScreening = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [searchParams] = useSearchParams();

  const [displayList, setDisplayList] = useState<Application[]>([]);

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    // let displayList: Application[] = [];s
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, [searchParams]);

  const handleAccept = (applicationId: string) => { 
    const url = "http://localhost:8000/api/v1/users/modifyApplication";
    const emailUrl = "http://localhost:8000/users/update-application-status";

    const body = {
      applicationId: applicationId,
      status: "screening",
    };

    // First, modify the application status
    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        // Send the email notification
        axios.post(emailUrl, {applicationId, status: "screening"}).then((notifyRes) => {
            if (notifyRes.status === 200) {
                toast.success("Accepted candidate and notified them");
            } else {
                toast.error("Failed to notify candidate");
            }
        })
        .catch(() => {
            toast.error("Failed to notify candidate");
        });

        location.reload();

      } else {
        toast.error("Failed to accept candidate");
      }
    }).catch(() => {
      toast.error("Failed to accept candidate");
    });
};

const handleReject = (applicationId: string) => {
  const url = "http://localhost:8000/api/v1/users/modifyApplication";
  const emailUrl = "http://localhost:8000/users/update-application-status";

  const body = {
      applicationId: applicationId,
      status: "rejected",
  };

  // First, modify the application status
  axios.post(url, body).then((res) => {
      if (res.status === 200) {
          // Send the email notification
          axios.post(emailUrl, {applicationId, status: "rejected"}).then((notifyRes) => {
              if (notifyRes.status === 200) {
                  toast.success("Rejected candidate and notified them");
              } else {
                  toast.error("Failed to notify candidate");
              }
          })
          .catch(() => {
              // Handle the error without declaring notifyError
              toast.error("Failed to notify candidate");
          });
          location.reload();
      } else {
          toast.error("Failed to reject candidate");
      }
  }).catch(() => {
      toast.error("Failed to reject candidate");
  });
};

  return (
    <>
      <div className="text-xl">Screening</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-1 " key={item._id}>
          <div className="p-2 mx-1 my-2 bg-white rounded-lg">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
                <div className="flex justify-center px-2 py-1 ml-2 border border-gray-300 rounded-md">
                  <a
                    href={`/resumeviewer/${item.applicantid}`}
                    className="text-red-500"
                  >
                    View Resume
                  </a>
                </div>
              </div>
              <div className="flex flex-row">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    return handleAccept(item._id);
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    return handleReject(item._id);
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobScreening;
