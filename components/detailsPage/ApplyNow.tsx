"use client";

import { applyToAJob } from '@/lib/actions/applications';
import { useSession } from '@/lib/auth-client';
import { JobPost } from '@/types/job';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';


const ApplyNow = ({ job }: { job: JobPost }) => {
    const router = useRouter()

    const { data: session } = useSession();
    const user = session?.user;

    const handleApplyNow = async () => {
        if (!user) {
            router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
            return
        } else if (user.role === 'seeker') {
            // save the application to the database
            console.log("save the application to the database");
            const application = {
                jobId: job._id,
                userId: user.id,
                email: user.email,
                jobTitle: job.title,
                companyName: job.company
            }

            const result = await applyToAJob(application);
            if(result.insertedId){
                console.log("Application submitted successfully");
                router.push('/browse-jobs')
            }


        } else {
            console.log('user is not a job seeker');
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label={`Save ${job.title}`}
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/[.07] bg-[#222228] text-[#E5E2E3] transition-colors hover:text-white"
                >
                    <Bookmark className="size-4.5" />
                </button>
                <button
                    type="button"
                    onClick={handleApplyNow}
                    className="h-12 rounded-lg bg-[#FAFAFA] px-6 font-medium text-[#0B0B0C] transition-colors hover:bg-white"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default ApplyNow;