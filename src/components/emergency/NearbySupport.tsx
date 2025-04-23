
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, ExternalLink, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type NearbySupportProps = {
  language: "english" | "hindi";
};

type Location = {
  latitude: number;
  longitude: number;
};

// Mock nearby support data - In a real app, this would come from an API using the user's location
const mockNearbySupports = [
  {
    name: { english: "NIMHANS Centre for Well-being", hindi: "निम्हांस सेंटर फॉर वेल-बीइंग" },
    type: { english: "Mental Health Clinic", hindi: "मानसिक स्वास्थ्य क्लिनिक" },
    distance: "2.5", // km
    phone: "08026995000",
    address: { 
      english: "1/B, 1st A Main Road, HRBR Layout 2nd Block, Kalyananagar, Bengaluru",
      hindi: "1/बी, प्रथम ए मुख्य मार्ग, HRBR लेआउट द्वितीय ब्लॉक, कल्याणनगर, बेंगलुरु"
    },
  },
  {
    name: { english: "Cadabams Hospital", hindi: "कदबम्स अस्पताल" },
    type: { english: "Psychiatric Hospital", hindi: "मनोचिकित्सा अस्पताल" },
    distance: "3.8", // km
    phone: "08046789999",
    address: { 
      english: "11th KM, Mysore Road, Rajarajeshwari Medical College, Bengaluru",
      hindi: "11 किमी, मैसूर रोड, राजराजेश्वरी मेडिकल कॉलेज, बेंगलुरु"
    },
  },
  {
    name: { english: "Manas Foundation", hindi: "मानस फाउंडेशन" },
    type: { english: "NGO - Counseling Center", hindi: "एनजीओ - परामर्श केंद्र" },
    distance: "4.2", // km
    phone: "01146598650",
    address: { 
      english: "C-75, South Extension Part II, New Delhi",
      hindi: "सी-75, साउथ एक्सटेंशन पार्ट II, नई दिल्ली"
    },
  },
];

export function NearbySupport({ language }: NearbySupportProps) {
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending");
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [supportCenters, setSupportCenters] = useState(mockNearbySupports);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "Nearby Support Centers",
      description: "Find mental health support facilities near you",
      permissionRequired: "Location permission required",
      permissionDescription: "To show nearby support centers, we need your location. Your location is only used to find support centers and is never stored.",
      allow: "Allow Location",
      notNow: "Not Now",
      grantPermission: "Grant Location Permission",
      km: "km away",
      call: "Call",
      directions: "Directions",
      type: "Type",
      distance: "Distance",
      loading: "Finding nearby support centers...",
      locationSuccess: "Location found! Loading nearby support centers...",
      locationError: "Couldn't access your location. Please try again.",
    },
    hindi: {
      title: "आस-पास के सहायता केंद्र",
      description: "अपने पास मानसिक स्वास्थ्य सहायता सुविधाएँ खोजें",
      permissionRequired: "स्थान अनुमति आवश्यक",
      permissionDescription: "आस-पास के सहायता केंद्र दिखाने के लिए, हमें आपका स्थान चाहिए। आपके स्थान का उपयोग केवल सहायता केंद्रों को खोजने के लिए किया जाता है और कभी संग्रहीत नहीं किया जाता है।",
      allow: "स्थान की अनुमति दें",
      notNow: "अभी नहीं",
      grantPermission: "स्थान अनुमति प्रदान करें",
      km: "किमी दूर",
      call: "कॉल करें",
      directions: "दिशा-निर्देश",
      type: "प्रकार",
      distance: "दूरी",
      loading: "आस-पास के सहायता केंद्रों की खोज कर रहे हैं...",
      locationSuccess: "स्थान मिल गया! आस-पास के सहायता केंद्र लोड कर रहे हैं...",
      locationError: "आपका स्थान एक्सेस नहीं कर सके। कृपया पुनः प्रयास करें।",
    }
  };

  const t = translations[language];

  // Check for geolocation availability on component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Check if permission was already granted in a previous session
      navigator.permissions?.query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            setLocationPermission('granted');
            requestLocationUpdates();
          } else if (result.state === 'prompt') {
            setShowPermissionDialog(true);
          } else {
            setLocationPermission('denied');
          }
        })
        .catch(() => {
          // Fallback for browsers that don't support permissions API
          setShowPermissionDialog(true);
        });
    } else {
      setLocationPermission("denied");
    }
  }, []);

  // Load support centers when location is available
  useEffect(() => {
    if (userLocation) {
      // In a real app, this would fetch nearby centers from an API
      // For now, we're just using the mock data and setting a loading state
      setIsLoading(true);
      
      toast({
        title: t.locationSuccess,
        duration: 3000,
      });
      
      // Simulate API call delay
      setTimeout(() => {
        // Sort centers by distance from user (in a real app)
        const sortedCenters = [...mockNearbySupports];
        setSupportCenters(sortedCenters);
        setIsLoading(false);
      }, 1000);
    }
  }, [userLocation, t, toast]);

  const requestLocationUpdates = () => {
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location retrieved:", position.coords);
        setLocationPermission("granted");
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationPermission("denied");
        setIsLoading(false);
        toast({
          title: t.locationError,
          variant: "destructive",
          duration: 3000,
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const requestLocationPermission = () => {
    setIsLoading(true);
    setShowPermissionDialog(false);
    requestLocationUpdates();
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleGetDirections = (address: string) => {
    if (userLocation) {
      window.open(`https://maps.google.com/?daddr=${encodeURIComponent(address)}`, "_blank");
    } else {
      window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
        <p className="text-sm text-gray-600">{t.description}</p>
      </div>

      <AlertDialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.permissionRequired}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.permissionDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLocationPermission("denied")}>{t.notNow}</AlertDialogCancel>
            <AlertDialogAction onClick={requestLocationPermission}>
              {t.allow}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-center">
            <Loader2 className="h-10 w-10 text-sahayata-blue mx-auto mb-4 animate-spin" />
            <p>{t.loading}</p>
          </div>
        </div>
      )}

      {locationPermission === "denied" && !isLoading && (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <Button onClick={() => {
            setShowPermissionDialog(true); 
            setLocationPermission("pending");
          }}>
            {t.grantPermission}
          </Button>
        </div>
      )}

      {locationPermission === "granted" && !isLoading && supportCenters.length > 0 && (
        <div className="space-y-4">
          {supportCenters.map((support, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="font-semibold">{support.name[language]}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1">
                      <span className="flex items-center">
                        <span className="font-medium mr-1">{t.type}:</span> 
                        {support.type[language]}
                      </span>
                      <span className="flex items-center">
                        <span className="font-medium mr-1">{t.distance}:</span>
                        {support.distance} {t.km}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{support.address[language]}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleCall(support.phone)}
                      className="flex-1 bg-sahayata-blue hover:bg-sahayata-blue/80"
                    >
                      <Phone className="h-4 w-4 mr-1" /> {t.call}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleGetDirections(support.address.english)} 
                      className="flex-1"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> {t.directions}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
