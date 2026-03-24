import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Trash2, PlusCircle, Info, CheckCircle, Clock } from 'lucide-react';

const MOCK_SERVICES_WITH_ADDONS = [
  {
    _id: '1',
    name: 'Haircut',
    category: 'Haircut',
    price: 150,
    durationMins: 30,
    addOns: [
      { _id: '101', name: 'Head Massage', price: 60, type: 'optional' },
      { _id: '102', name: 'Hair Wash', price: 40, type: 'recommended' },
      { _id: '103', name: 'Beard Trim', price: 30, type: 'optional' },
    ],
  },
  {
    _id: '2',
    name: 'Hair Spa',
    category: 'Hair Spa',
    price: 300,
    durationMins: 45,
    addOns: [
      { _id: '201', name: 'Hair Cut', price: 150, type: 'optional' },
      { _id: '202', name: 'Blow Dry', price: 50, type: 'optional' },
    ],
  },
  {
    _id: '3',
    name: 'Facial',
    category: 'Facial',
    price: 250,
    durationMins: 45,
    addOns: [
      { _id: '301', name: 'Neck Massage', price: 100, type: 'recommended' },
      { _id: '302', name: 'Face Pack', price: 80, type: 'optional' },
      { _id: '303', name: 'Threading', price: 50, type: 'optional' },
    ],
  },
  {
    _id: '4',
    name: 'Waxing',
    category: 'Waxing',
    price: 200,
    durationMins: 30,
    addOns: [
      { _id: '401', name: 'After Wax Lotion', price: 30, type: 'recommended' },
    ],
  },
];

export default function MobileServiceAddOnsScreen() {
  const navigate = useNavigate();

  const [displayServices, setDisplayServices] = useState(MOCK_SERVICES_WITH_ADDONS);
  const [selectedService, setSelectedService] = useState(null);
  const [addOnModalVisible, setAddOnModalVisible] = useState(false);
  const [editingAddOn, setEditingAddOn] = useState(null);

  const [addOnForm, setAddOnForm] = useState({
    name: '',
    price: '',
    type: 'optional',
  });

  const openAddOnModal = (service, addOn = null) => {
    setSelectedService(service);
    if (addOn) {
      setEditingAddOn(addOn);
      setAddOnForm({
        name: addOn.name,
        price: addOn.price.toString(),
        type: addOn.type,
      });
    } else {
      setEditingAddOn(null);
      setAddOnForm({
        name: '',
        price: '',
        type: 'optional',
      });
    }
    setAddOnModalVisible(true);
  };

  const handleSaveAddOn = () => {
    if (!addOnForm.name.trim() || !addOnForm.price.trim()) {
      alert('Please fill all fields');
      return;
    }

    if (isNaN(parseFloat(addOnForm.price))) {
      alert('Please enter a valid price');
      return;
    }

    setDisplayServices(
      displayServices.map((service) =>
        service._id === selectedService._id
          ? {
              ...service,
              addOns: editingAddOn
                ? service.addOns.map((addon) =>
                    addon._id === editingAddOn._id
                      ? {
                          ...addon,
                          name: addOnForm.name,
                          price: parseFloat(addOnForm.price),
                          type: addOnForm.type,
                        }
                      : addon
                  )
                : [
                    ...service.addOns,
                    {
                      _id: Date.now().toString(),
                      name: addOnForm.name,
                      price: parseFloat(addOnForm.price),
                      type: addOnForm.type,
                    },
                  ],
            }
          : service
      )
    );

    setAddOnModalVisible(false);
    setAddOnForm({ name: '', price: '', type: 'optional' });
    setEditingAddOn(null);
    setSelectedService(null);
  };

  const handleDeleteAddOn = (serviceId, addOnId) => {
    if (window.confirm('Are you sure you want to delete this add-on?')) {
      setDisplayServices(
        displayServices.map((service) =>
          service._id === serviceId
            ? {
                ...service,
                addOns: service.addOns.filter((addon) => addon._id !== addOnId),
              }
            : service
        )
      );
    }
  };

  const getTypeColor = (type) => {
    return type === 'recommended' ? '#FF9800' : '#2196F3';
  };

  const renderServiceCard = (service) => (
    <div
      key={service._id}
      className="bg-white rounded-xl p-4 mb-3"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <div className="mb-3">
        <div className="flex-1">
          <div className="text-base font-bold text-gray-800">{service.name}</div>
          <div className="flex flex-row gap-3 mt-1.5 items-center">
            <div className="text-xs font-medium px-2 py-1 rounded" style={{ color: '#156778', backgroundColor: '#E3F2FD' }}>
              {service.category}
            </div>
            <div className="text-sm font-bold text-green-600">₹{service.price}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">⏱ {service.durationMins} mins</div>
          </div>
        </div>
      </div>

      {/* Add-ons List */}
      {service.addOns.length > 0 ? (
        <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
          <div className="text-[13px] font-semibold text-gray-800 mb-2.5">
            Add-ons ({service.addOns.length})
          </div>
          {service.addOns.map((addOn) => (
            <div
              key={addOn._id}
              className="bg-white rounded-lg p-2.5 mb-2 flex flex-row justify-between items-center border-l-4"
              style={{ borderLeftColor: '#156778' }}
            >
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-gray-800">{addOn.name}</div>
                <div className="flex flex-row gap-2 mt-1.5 items-center">
                  <div
                    className="px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: getTypeColor(addOn.type) }}
                  >
                    <div className="text-[9px] font-bold text-white uppercase tracking-wider">
                      {addOn.type}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-blue-500">₹{addOn.price}</div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => openAddOnModal(service, addOn)}
                  className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 size={18} color="#156778" />
                </button>
                <button
                  onClick={() => handleDeleteAddOn(service._id, addOn._id)}
                  className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 size={18} color="#f44336" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center mb-3 text-gray-400 text-xs text-center">
          No add-ons yet
        </div>
      )}

      {/* Add Add-on Button */}
      <button
        onClick={() => openAddOnModal(service)}
        className="w-full flex flex-row bg-green-500 rounded-lg py-2.5 justify-center items-center gap-1.5 hover:bg-green-600 transition-colors cursor-pointer"
      >
        <PlusCircle size={16} color="#fff" />
        <span className="text-white text-[13px] font-semibold">Add Add-on</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100 font-sans pb-8">
      {/* Header */}
      <div className="bg-[#156778] px-4 py-3 flex flex-row items-start gap-3 sticky top-0 z-10 w-full">
        <button onClick={() => navigate(-1)} className="mt-0.5 -ml-1 p-1 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors cursor-pointer">
          <ChevronLeft size={24} color="#fff" />
        </button>
        <div className="flex-1">
          <div className="text-[20px] font-bold text-white leading-tight">Service Add-ons</div>
          <div className="text-[12px] text-gray-200 mt-0.5 leading-tight">Manage add-ons for your services</div>
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 flex-1">
        {displayServices.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20">
             <div className="text-6xl text-gray-300">🤷</div>
            <div className="text-base text-gray-400 mt-3">No services available</div>
          </div>
        ) : (
          displayServices.map(renderServiceCard)
        )}
      </div>

      {/* Add/Edit Add-on Modal */}
      {addOnModalVisible && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-gray-100 animate-in slide-in-from-bottom-full duration-300">
          <div className="flex flex-row items-start px-4 py-3 bg-white border-b border-gray-200 gap-3">
            <button
              onClick={() => setAddOnModalVisible(false)}
              className="p-1 -ml-1 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} color="#156778" />
            </button>
            <div className="flex-1">
              <div className="text-base font-bold text-gray-800 leading-tight">
                {editingAddOn ? 'Edit Add-on' : 'Add New Add-on'}
              </div>
              <div className="text-xs text-gray-400 mt-1 leading-tight">{selectedService?.name}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Add-on Name */}
            <div className="text-[13px] font-semibold text-gray-800 mt-2 mb-2">Add-on Name *</div>
            <input
              type="text"
              className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="e.g., Head Massage, Hair Wash"
              value={addOnForm.name}
              onChange={(e) => setAddOnForm({ ...addOnForm, name: e.target.value })}
            />

            {/* Price */}
            <div className="text-[13px] font-semibold text-gray-800 mt-4 mb-2">Price (₹) *</div>
            <input
              type="number"
              className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="e.g., 60"
              value={addOnForm.price}
              onChange={(e) => setAddOnForm({ ...addOnForm, price: e.target.value })}
            />

            {/* Type Selection */}
            <div className="text-[13px] font-semibold text-gray-800 mt-4 mb-2">Type</div>
            <div className="flex flex-row gap-2.5">
              <button
                type="button"
                className={`flex-1 flex flex-row justify-center items-center rounded-lg py-3 px-2.5 border-2 transition-colors gap-2 cursor-pointer ${
                  addOnForm.type === 'optional' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setAddOnForm({ ...addOnForm, type: 'optional' })}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    addOnForm.type === 'optional' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                  }`}
                />
                <span className="text-xs font-semibold text-gray-600">Optional</span>
              </button>

              <button
                type="button"
                className={`flex-1 flex flex-row justify-center items-center rounded-lg py-3 px-2.5 border-2 transition-colors gap-2 cursor-pointer ${
                  addOnForm.type === 'recommended' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setAddOnForm({ ...addOnForm, type: 'recommended' })}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    addOnForm.type === 'recommended' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                  }`}
                />
                <span className="text-xs font-semibold text-gray-600">Recommended</span>
              </button>
            </div>

            <div className="text-[11px] text-gray-500 mt-2 italic">
              💡 Recommended add-ons will be suggested to customers
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg p-3 mt-4 flex flex-row gap-2 items-start">
              <Info size={18} color="#2196F3" className="mt-0.5 shrink-0" />
              <div className="text-xs text-blue-800 flex-1 leading-relaxed">
                Add-ons will appear in the service details when customers book this service
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAddOn}
              className="w-full bg-[#156778] hover:bg-[#115462] rounded-lg py-3.5 mt-6 mb-5 flex flex-row justify-center items-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle size={20} color="#fff" />
              <span className="text-[15px] font-bold text-white">
                {editingAddOn ? 'Update Add-on' : 'Add Add-on'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
