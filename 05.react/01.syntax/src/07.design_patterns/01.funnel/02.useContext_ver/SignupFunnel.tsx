// SignupFunnel.tsx
import React, { useState } from 'react';
import { Funnel, useFunnel } from './components/Funnel';
import { Step } from './components/Step';

interface SignupData {
  type: string;
  residentNumber: string;
  address: string;
  companyAddress: string;
}

export function SignupFunnel() {
  const { setStep } = useFunnel(); 

  const [signupData, setSignupData] = useState<SignupData>({
    type: '',
    residentNumber: '',
    address: '',
    companyAddress: '',
  });

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // API call here
      await registerUser(signupData);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Funnel>
      <Step name="selectType">
        <SelectType 
          onNext={(type: string) => {
            handleInputChange('type', type);
            setStep('residentNumber');
            // useFunnel().setStep('residentNumber');
          }}
        />
      </Step>
      <Step name="residentNumber">
        <ResidentNumber 
          onNext={(number: string) => {
            handleInputChange('residentNumber', number);
            setStep('address');
          }}
        />
      </Step>
      <Step name="address">
        <Address 
          onNext={(address: string) => {
            handleInputChange('address', address);
            setStep('companyAddress');
          }}
        />
      </Step>
      <Step name="companyAddress">
        <CompanyAddress 
          onNext={(companyAddress: string) => {
            handleInputChange('companyAddress', companyAddress);
            handleSubmit();
          }}
        />
      </Step>
    </Funnel>
  );
}

// Implement these components according to your needs
function SelectType({ onNext }: { onNext: (type: string) => void }) {
  return (
    <div>
      {/* Add your actual implementation here */}
      <button onClick={() => onNext('someType')}>Select Type</button>
    </div>
  );
}

function ResidentNumber({ onNext }: { onNext: (number: string) => void }) {
  return (
    <div>
      {/* Add your actual implementation here */}
      <button onClick={() => onNext('someType')}>Select Type</button>
    </div>
  );
}

function Address({ onNext }: { onNext: (address: string) => void }) {
  return (
    <div>
      {/* Add your actual implementation here */}
      <button onClick={() => onNext('someType')}>Select Type</button>
    </div>
  );
}

function CompanyAddress({ onNext }: { onNext: (companyAddress: string) => void }) {
  return (
    <div>
      {/* Add your actual implementation here */}
      <button onClick={() => onNext('someType')}>Select Type</button>
    </div>
  );
}

async function registerUser(data: SignupData) {
  return (
    <div>
      {/* Add your actual implementation here */}
    </div>
  );
}