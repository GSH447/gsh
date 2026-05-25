'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../lib/api';

export default function AppointmentBooking() {

  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [reason, setReason] = useState('');

  const [loading, setLoading] = useState(false);

  /* -------------------------------- */
  /* SAFE ARRAY EXTRACTOR */
  /* -------------------------------- */

  const extractArray = (response, key = null) => {

    if (Array.isArray(response)) {
      return response;
    }

    if (key && Array.isArray(response[key])) {
      return response[key];
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  };

  /* -------------------------------- */
  /* FETCH SPECIALIZATIONS */
  /* -------------------------------- */

  useEffect(() => {

    fetch(`${API_BASE_URL}doctors-specializations`)
      .then((res) => res.json())
      .then((data) => {

        console.log('SPECIALIZATIONS:', data);

        const arrayData = extractArray(
          data,
          'specializations'
        );

        setSpecializations(arrayData);

      })
      .catch((error) => {

        console.error(error);

        setSpecializations([]);

      });

  }, []);

  /* -------------------------------- */
  /* FETCH DOCTORS */
  /* -------------------------------- */

  useEffect(() => {

    fetch(`${API_BASE_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {

        console.log('DOCTORS:', data);

        const doctorsArray = extractArray(
          data,
          'doctors'
        );

        setDoctors(doctorsArray);
        setFilteredDoctors(doctorsArray);

      })
      .catch((error) => {

        console.error(error);

        setDoctors([]);
        setFilteredDoctors([]);

      });

  }, []);

  /* -------------------------------- */
  /* FILTER DOCTORS */
  /* -------------------------------- */

  useEffect(() => {

    if (!selectedSpecialization) {

      setFilteredDoctors(doctors);

      return;
    }

    const filtered = doctors.filter((doctor) => {

      return (
        String(
          doctor.specialization_id ||
          doctor.specialization ||
          doctor.specialty_id
        ) === String(selectedSpecialization)
      );

    });

    setFilteredDoctors(filtered);

  }, [selectedSpecialization, doctors]);

  /* -------------------------------- */
  /* FETCH SCHEDULES */
  /* -------------------------------- */

  useEffect(() => {

    if (!selectedDoctor) return;

    fetch(
      `${API_BASE_URL}doctors/list/schedules?id=${selectedDoctor}`
    )
      .then((res) => res.json())
      .then((data) => {

        console.log('SCHEDULES:', data);

        const schedulesArray = extractArray(
          data,
          'schedules'
        );

        setSchedules(schedulesArray);

      })
      .catch((error) => {

        console.error(error);

        setSchedules([]);

      });

  }, [selectedDoctor]);

  /* -------------------------------- */
  /* BOOK APPOINTMENT */
  /* -------------------------------- */

  const handleBookAppointment = async () => {

    if (
      !selectedDoctor ||
      !selectedDate ||
      !selectedTime ||
      !patientName ||
      !patientPhone
    ) {
      alert('Please complete all required fields');
      return;
    }

    try {

      setLoading(true);

      const payload = {
        patient_name: patientName,
        patient_phone: patientPhone,
        doctor_id: selectedDoctor,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        reason_for_visit: reason,
        booking_type: 'PRE BOOKED',
        duration: 30,
      };

      console.log('BOOKING PAYLOAD:', payload);

      const response = await fetch(
        `${API_BASE_URL}appointments/book`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log('BOOKING RESPONSE:', data);

      if (
        data.success ||
        data.status ||
        response.ok
      ) {

        alert('Appointment booked successfully');

        setPatientName('');
        setPatientPhone('');
        setReason('');
        setSelectedDate('');
        setSelectedDoctor('');
        setSelectedTime('');
        setSelectedSpecialization('');
        setSchedules([]);

      } else {

        alert(
          data.message ||
          'Booking failed'
        );
      }

    } catch (error) {

      console.error(error);

      alert('Something went wrong');

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="py-20 bg-[#f8fbff]">

      <div className="max-w-5xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12"
        >

          {/* HEADER */}

          <div className="mb-10">

            <h2 className="text-3xl lg:text-5xl font-black text-[#1E1E1E]">
              Book Appointment
            </h2>

            <p className="text-gray-500 mt-3">
              Reserve a consultation slot directly
              from our clinical registry.
            </p>

          </div>

          {/* FORM GRID */}

          <div className="grid lg:grid-cols-2 gap-6">

            {/* SPECIALIZATION */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Specialization
              </label>

              <select
                value={selectedSpecialization}
                onChange={(e) =>
                  setSelectedSpecialization(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              >

                <option value="">
                  Select Specialization
                </option>

                {Array.isArray(specializations) &&
                  specializations.map((item, index) => (

                    <option
                      key={item.id || index}
                      value={item.id}
                    >
                      {item.name ||
                        item.specialization_name ||
                        item.title}
                    </option>

                  ))}

              </select>

            </div>

            {/* DOCTORS */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Consulting Doctor
              </label>

              <select
                value={selectedDoctor}
                onChange={(e) =>
                  setSelectedDoctor(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              >

                <option value="">
                  Select Doctor
                </option>

                {Array.isArray(filteredDoctors) &&
                  filteredDoctors.map((doctor, index) => (

                    <option
                      key={doctor.id || index}
                      value={doctor.id}
                    >
                      {doctor.name ||
                        doctor.full_name ||
                        doctor.doctor_name}
                    </option>

                  ))}

              </select>

            </div>

            {/* DATE */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Appointment Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

            </div>

            {/* TIME SLOT */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Time Slot
              </label>

              <select
                value={selectedTime}
                onChange={(e) =>
                  setSelectedTime(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              >

                <option value="">
                  Select Time Slot
                </option>

                {Array.isArray(schedules) &&
                  schedules.map((slot, index) => (

                    <option
                      key={index}
                      value={
                        slot.time ||
                        slot.slot ||
                        slot.start_time
                      }
                    >
                      {slot.time ||
                        slot.slot ||
                        slot.start_time}
                    </option>

                  ))}

              </select>

            </div>

            {/* PATIENT NAME */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Patient Name
              </label>

              <input
                type="text"
                value={patientName}
                onChange={(e) =>
                  setPatientName(
                    e.target.value
                  )
                }
                placeholder="Enter patient name"
                className="w-full border rounded-2xl p-4"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="font-semibold text-sm mb-2 block">
                Phone Number
              </label>

              <input
                type="text"
                value={patientPhone}
                onChange={(e) => {

                  const value = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 12);

                  setPatientPhone(value);

                }}
                placeholder="080..."
                className="w-full border rounded-2xl p-4"
              />

            </div>

          </div>

          {/* REASON */}

          <div className="mt-6">

            <label className="font-semibold text-sm mb-2 block">
              Reason for Visit
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              rows={5}
              placeholder="Brief summary..."
              className="w-full border rounded-2xl p-4"
            />

          </div>

          {/* BUTTON */}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookAppointment}
            disabled={loading}
            className="mt-8 w-full bg-[#2A157C] hover:bg-[#3b239d] text-white font-bold py-4 rounded-2xl disabled:opacity-50"
          >

            {loading
              ? 'Processing...'
              : 'Confirm Appointment'}

          </motion.button>

        </motion.div>

      </div>

    </section>
  );
}




// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { API_BASE_URL } from '../../lib/api';

// export default function AppointmentBooking() {


//   const [specializations, setSpecializations] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [schedules, setSchedules] = useState([]);

//   const [selectedSpecialization, setSelectedSpecialization] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');

//   const [patientName, setPatientName] = useState('');
//   const [patientPhone, setPatientPhone] = useState('');
//   const [reason, setReason] = useState('');

//   const [loading, setLoading] = useState(false);

//   /* -------------------------------- */
//   /* FETCH SPECIALIZATIONS */
//   /* -------------------------------- */

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/doctors-specializations`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSpecializations(data.data || []);
//       });
//   }, []);


//   // useEffect(() => {
//   //   fetch(`${API_BASE_URL}/doctors-specializations`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setSpecializations(data);
//   //     });
//   // }, []);

//   /* -------------------------------- */
//   /* FETCH DOCTORS */
//   /* -------------------------------- */

//   useEffect(() => {

//     fetch(`${API_BASE}/doctors`)
//       .then((res) => res.json())
//       .then((data) => {

//         let doctorsArray = [];

//         if (Array.isArray(data)) {
//           doctorsArray = data;

//         } else if (Array.isArray(data.data)) {
//           doctorsArray = data.data;

//         } else if (Array.isArray(data.doctors)) {
//           doctorsArray = data.doctors;
//         }

//         setDoctors(doctorsArray);
//         setFilteredDoctors(doctorsArray);

//       })
//       .catch((error) => {
//         console.error(error);

//         setDoctors([]);
//         setFilteredDoctors([]);
//       });

//   }, []);
  
//   // useEffect(() => {
//   //   fetch(`${API_BASE_URL}/doctors`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setDoctors(data);
//   //       setFilteredDoctors(data);
//   //     });
//   // }, []);

//   /* -------------------------------- */
//   /* FILTER DOCTORS */
//   /* -------------------------------- */

//   useEffect(() => {

//     if (!selectedSpecialization) {
//       setFilteredDoctors(doctors);
//       return;
//     }

//     const filtered = doctors.filter(
//       (doctor) =>
//         doctor.specialization_id == selectedSpecialization
//     );

//     setFilteredDoctors(filtered);

//   }, [selectedSpecialization, doctors]);

//   /* -------------------------------- */
//   /* FETCH SCHEDULES */
//   /* -------------------------------- */

//   useEffect(() => {

//     if (!selectedDoctor) return;

//     fetch(
//       `${API_BASE_URL}/doctors/list/schedules?id=${selectedDoctor}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setSchedules(data);
//       });

//   }, [selectedDoctor]);

//   /* -------------------------------- */
//   /* BOOK APPOINTMENT */
//   /* -------------------------------- */

//   const handleBookAppointment = async () => {

//     if (
//       !selectedDoctor ||
//       !selectedDate ||
//       !selectedTime ||
//       !patientName ||
//       !patientPhone
//     ) {
//       alert('Please complete all required fields');
//       return;
//     }

//     try {

//       setLoading(true);

//       const payload = {
//         patient_name: patientName,
//         patient_phone: patientPhone,
//         doctor_id: selectedDoctor,
//         appointment_date: selectedDate,
//         appointment_time: selectedTime,
//         reason_for_visit: reason,
//         booking_type: 'PRE BOOKED',
//         duration: 30,
//       };

//       const response = await fetch(
//         `${API_BASE}/appointments/book`,
//         {
//           method: 'POST',

//           headers: {
//             'Content-Type': 'application/json',
//           },

//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {

//         alert('Appointment booked successfully');

//         setPatientName('');
//         setPatientPhone('');
//         setReason('');
//         setSelectedDate('');
//         setSelectedDoctor('');
//         setSelectedTime('');

//       } else {
//         alert(data.message || 'Booking failed');
//       }

//     } catch (error) {

//       console.error(error);

//       alert('Something went wrong');

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <section className="py-20 bg-[#f8fbff]">

//       <div className="max-w-5xl mx-auto px-4">

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false }}
//           className="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12"
//         >

//           <div className="mb-10">

//             <h2 className="text-3xl lg:text-5xl font-black text-[#1E1E1E]">
//               Book Appointment
//             </h2>

//             <p className="text-gray-500 mt-3">
//               Reserve a consultation slot directly from our clinical registry.
//             </p>

//           </div>

//           <div className="grid lg:grid-cols-2 gap-6">

//             {/* SPECIALIZATION */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Specialization
//               </label>

//               <select
//                 value={selectedSpecialization}
//                 onChange={(e) =>
//                   setSelectedSpecialization(e.target.value)
//                 }
//                 className="w-full border rounded-2xl p-4"
//               >
//                 <option value="">
//                   Select Specialization
//                 </option>

//                 {specializations.map((item) => (
//                   <option
//                     key={item.id}
//                     value={item.id}
//                   >
//                     {item.name}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* DOCTOR */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Consulting Doctor
//               </label>

//               <select
//                 value={selectedDoctor}
//                 onChange={(e) =>
//                   setSelectedDoctor(e.target.value)
//                 }
//                 className="w-full border rounded-2xl p-4"
//               >
//                 <option value="">
//                   Select Doctor
//                 </option>

//                 {filteredDoctors.map((doctor) => (
//                   <option
//                     key={doctor.id}
//                     value={doctor.id}
//                   >
//                     {doctor.name}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* DATE */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Appointment Date
//               </label>

//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) =>
//                   setSelectedDate(e.target.value)
//                 }
//                 className="w-full border rounded-2xl p-4"
//               />

//             </div>

//             {/* TIME SLOT */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Time Slot
//               </label>

//               <select
//                 value={selectedTime}
//                 onChange={(e) =>
//                   setSelectedTime(e.target.value)
//                 }
//                 className="w-full border rounded-2xl p-4"
//               >
//                 <option value="">
//                   Select Time Slot
//                 </option>

//                 {schedules.map((slot, index) => (
//                   <option
//                     key={index}
//                     value={slot.time}
//                   >
//                     {slot.time}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* PATIENT NAME */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Patient Name
//               </label>

//               <input
//                 type="text"
//                 value={patientName}
//                 onChange={(e) =>
//                   setPatientName(e.target.value)
//                 }
//                 placeholder="Enter patient name"
//                 className="w-full border rounded-2xl p-4"
//               />

//             </div>

//             {/* PHONE */}
//             <div>

//               <label className="font-semibold text-sm mb-2 block">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 value={patientPhone}
//                 onChange={(e) =>
//                   setPatientPhone(e.target.value)
//                 }
//                 placeholder="080..."
//                 className="w-full border rounded-2xl p-4"
//               />

//             </div>

//           </div>

//           {/* REASON */}
//           <div className="mt-6">

//             <label className="font-semibold text-sm mb-2 block">
//               Reason for Visit
//             </label>

//             <textarea
//               value={reason}
//               onChange={(e) =>
//                 setReason(e.target.value)
//               }
//               rows={5}
//               placeholder="Brief summary..."
//               className="w-full border rounded-2xl p-4"
//             />

//           </div>

//           {/* BUTTON */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleBookAppointment}
//             disabled={loading}
//             className="mt-8 w-full bg-[#2A157C] hover:bg-[#3b239d] text-white font-bold py-4 rounded-2xl"
//           >
//             {loading
//               ? 'Processing...'
//               : 'Confirm Appointment'}
//           </motion.button>

//         </motion.div>

//       </div>

//     </section>
//   );
// }