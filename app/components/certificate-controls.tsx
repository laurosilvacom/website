'use client'

import {useState} from 'react'
import {Download} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

interface CertificateControlsProps {
	workshopTitle: string
	certificateId: string
	formattedDate: string
}

export function CertificateControls({
	workshopTitle,
	certificateId,
	formattedDate
}: CertificateControlsProps) {
	const [userName, setUserName] = useState<string>('Your Name')

	// Update certificate name
	const updateCertificate = () => {
		const nameInput = document.getElementById('name') as HTMLInputElement
		if (nameInput.value.trim()) {
			setUserName(nameInput.value)
		} else {
			setUserName('Your Name')
		}
	}

	// Handle certificate download
	const downloadCertificate = () => {
		// Create a new window for printing
		const printWindow = window.open('', '_blank')
		if (!printWindow) {
			alert('Please allow popups for this website to download your certificate')
			return
		}

		// Add content to the new window
		printWindow.document.write('<html><head><title>Certificate</title>')

		// Add styles for better printing
		printWindow.document.write(`
      <style>
        body { margin: 0; padding: 20px; background-color: #1a1a1a; color: #ffffff; }
        .certificate {
          max-width: 800px;
          margin: 0 auto;
          border: 8px solid rgba(245, 213, 71, 0.2);
          border-radius: 8px;
          background-color: #1a1a1a;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .certificate-inner {
          border: 4px solid rgba(245, 213, 71, 0.1);
          padding: 2px;
        }
        .certificate-content {
          border: 2px dashed rgba(245, 213, 71, 0.2);
          padding: 40px 20px;
          text-align: center;
        }
        .certificate-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .certificate-name {
          font-size: 36px;
          font-weight: bold;
          font-style: italic;
          border-bottom: 2px solid rgba(245, 213, 71, 0.2);
          padding-bottom: 8px;
          margin: 30px 0;
          display: inline-block;
          color: #ffffff;
        }
        .certificate-course {
          font-size: 24px;
          font-weight: bold;
          color: #F5D547;
          margin: 20px 0;
        }
        .certificate-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding: 0 40px;
        }
        .certificate-signature {
          text-align: center;
          color: #ffffff;
        }
        .signature-line {
          width: 160px;
          height: 1px;
          background-color: rgba(245, 213, 71, 0.2);
          margin-bottom: 5px;
        }
        .certificate-id {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          margin-top: 30px;
        }
        .description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
        @media print {
          body { background-color: #1a1a1a; }
        }
      </style>
    `)

		printWindow.document.write('</head><body>')

		// Certificate HTML structure
		printWindow.document.write(`
      <div class="certificate">
        <div class="certificate-inner">
          <div class="certificate-content">
            <div class="certificate-title">Certificate of Completion</div>
            <div class="description">This document certifies that</div>
            <div class="certificate-name">${userName}</div>
            <div class="description">has successfully completed</div>
            <div class="certificate-course">${workshopTitle}</div>
            <div class="description">demonstrating proficiency in all required skills and knowledge</div>

            <div class="certificate-footer">
              <div class="certificate-signature">
                <div class="signature-line"></div>
                <div>Date</div>
                <div>${formattedDate}</div>
              </div>

              <div class="certificate-signature">
                <div class="signature-line"></div>
                <div>Instructor</div>
                <div>Lauro Silva</div>
              </div>
            </div>

            <div class="certificate-id">Certificate ID: ${certificateId}</div>
          </div>
        </div>
      </div>
    `)

		printWindow.document.write('</body></html>')
		printWindow.document.close()

		// After content is loaded, trigger print dialog
		printWindow.onload = function () {
			printWindow.print()
		}
	}

	return (
		<>
			{/* Certificate Form */}
			<div className="bg-card border-border mb-8 rounded-lg border p-6 shadow-md">
				<h2 className="mb-4 text-xl font-semibold">
					Personalize Your Certificate
				</h2>
				<div className="space-y-4">
					<div>
						<label htmlFor="name" className="mb-2 block text-sm font-medium">
							Enter your full name
						</label>
						<Input
							id="name"
							placeholder="John Doe"
							className="max-w-md"
							defaultValue=""
						/>
					</div>
					<Button className="mt-2" onClick={updateCertificate}>
						Update Certificate
					</Button>
				</div>
			</div>

			{/* Certificate Preview */}
			<div className="border-primary/20 bg-card relative overflow-hidden rounded-lg border-8 shadow-xl">
				{/* Certificate Background */}
				<div className="absolute inset-0 z-0 opacity-5">
					<div className="bg-primary/30 absolute -top-20 -left-20 h-80 w-80 rounded-full"></div>
					<div className="bg-primary/30 absolute -right-20 -bottom-20 h-80 w-80 rounded-full"></div>
					<div className="border-primary/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-8"></div>
				</div>

				{/* Certificate Content */}
				<div className="border-primary/10 relative z-10 border-4 p-2">
					<div className="border-primary/20 border-2 border-dashed p-8">
						{/* Certificate Content - Now uses the state variable */}
						<div className="mb-8 flex flex-col items-center space-y-2 text-center">
							<div className="bg-primary/10 inline-flex items-center justify-center rounded-full p-3">
								<svg
									className="text-primary h-10 w-10"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
								</svg>
							</div>
							<h1 className="text-3xl font-bold tracking-tight">
								Certificate of Completion
							</h1>
							<p className="text-muted-foreground text-sm">
								This document certifies that
							</p>
						</div>

						{/* Name - Uses state variable */}
						<div className="my-10 text-center">
							<h2 className="border-primary/20 border-b-2 pb-2 text-4xl font-bold italic">
								{userName}
							</h2>
						</div>

						{/* Course Info */}
						<div className="my-10 text-center">
							<p className="text-muted-foreground mb-3 text-sm">
								has successfully completed
							</p>
							<h3 className="text-primary text-2xl font-bold">
								{workshopTitle}
							</h3>
							<p className="text-muted-foreground mt-2 text-sm">
								demonstrating proficiency in all required skills and knowledge
							</p>
						</div>

						{/* Date and Signature */}
						<div className="mt-12 flex justify-between">
							<div className="text-center">
								<div className="bg-primary/20 h-px w-40"></div>
								<p className="text-muted-foreground mt-1 text-sm">Date</p>
								<p className="text-md font-medium">{formattedDate}</p>
							</div>

							<div className="text-center">
								<div className="bg-primary/20 h-px w-40"></div>
								<p className="text-muted-foreground mt-1 text-sm">Instructor</p>
								<p className="text-md font-medium">Lauro Silva</p>
							</div>
						</div>

						{/* Certificate ID */}
						<div className="text-muted-foreground mt-8 flex items-center justify-center space-x-2 text-center text-xs">
							<svg
								className="h-3 w-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
							</svg>
							<span>Certificate ID: {certificateId}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Actions - Share button removed */}
			<div className="mt-8 flex justify-center">
				<Button
					variant="default"
					className="gap-2"
					onClick={downloadCertificate}>
					<Download className="h-4 w-4" />
					Download Certificate
				</Button>
			</div>
		</>
	)
}
