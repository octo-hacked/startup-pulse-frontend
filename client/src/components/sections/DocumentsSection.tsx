import React, { useRef, useState, useEffect } from "react";
import { FileText, Upload, Check, Eye } from "lucide-react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  uploaded: boolean;
  points: number;
}

export const DocumentsSection = () => {

  const {token,backendUrl} = useAppContext();
  const [documents, setDocuments] = useState<DocumentCategory[]>([]);
  const fetchDocuments = async () => {
      try {

        const response = await axios.post(backendUrl+'/api/documents/list',{}, {
          headers: {
           token
          },
        });

        if (response.data.success) {
          setDocuments(response.data.documents);
        } else {
          console.warn(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    useEffect(() => {
      fetchDocuments();
    }, []);


  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleUploadClick = (id: string) => {
    fileInputRefs.current[id]?.click();
  };

 const handleFileChange = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validate file size
  if (file.size > 10 * 1024 * 1024) {
    alert("File size must be under 10MB");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('document', file);

    const response = await axios.post(`${backendUrl}/api/documents/upload/${id}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
       token
      },
    });
     
    console.log('Upload response:', response);

    const data = response.data;

    if (data.success) {
      const updateUser = await axios.post(`${backendUrl}/api/documents/update/${id}`, {
        secure_url:data.documentUrl,
      }, {
        headers: { token }
      });
      if (updateUser.data.success) {
        console.log('Document updated successfully:', updateUser.data);
        fetchDocuments();
      }
    } else {
      alert(data.message || 'Upload failed');
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    alert(
      error.response?.data?.message ||
      error.message ||
      'Something went wrong during upload.'
    );
  }
};

  const totalDocuments = documents.length;
  const uploadedCount = documents.filter((doc) => doc.uploaded).length;
  const totalPoints = uploadedCount * 5;
  const pendingUploads = totalDocuments - uploadedCount;

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Categories</p>
        <p className="text-3xl font-bold text-gray-900">{totalDocuments}</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-lg">
        <FileText className="text-blue-600" size={24} />
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Uploaded</p>
        <p className="text-3xl font-bold text-green-600">{uploadedCount}</p>
      </div>
      <div className="bg-green-100 p-3 rounded-lg">
        <Check className="text-green-600" size={24} />
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Points Earned</p>
        <p className="text-3xl font-bold text-purple-600">{totalPoints}</p>
      </div>
      <div className="bg-purple-100 p-3 rounded-lg">
        <Eye className="text-purple-600" size={24} />
      </div>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Pending</p>
        <p className="text-3xl font-bold text-orange-600">{pendingUploads}</p>
      </div>
      <div className="bg-orange-100 p-3 rounded-lg">
        <Upload className="text-orange-600" size={24} />
      </div>
    </div>
  </div>
</div>


      {/* Document Upload Cards */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                category.uploaded
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                </div>
                <div className="ml-4">
                  {category.uploaded ? (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      <Check size={16} />
                      <span className="text-sm font-medium">
                        +{category.points} pts
                      </span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleUploadClick(category.id)}
                        className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Upload size={16} />
                        <span className="text-sm font-medium">Upload</span>
                      </button>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(el) => (fileInputRefs.current[category.id] = el)}
                        onChange={(e) => handleFileChange(category.id, e)}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="text-sm font-medium">
                {category.uploaded ? (
                  <span className="text-green-600">✓ Document uploaded successfully</span>
                ) : (
                  <span className="text-gray-500">
                    Click upload to submit this document
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Instructions */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileText className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Upload Requirements</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Documents must be clear and readable</li>
              <li>• Accepted formats: PDF, JPG, PNG</li>
              <li>• Maximum file size: 10MB per document</li>
              <li>• Earn 5 points for each completed upload</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
