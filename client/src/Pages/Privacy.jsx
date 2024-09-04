import React from 'react';
import { Footer } from '../components/Footer';

export function Privacy() {
	return (
		<>
			<section className="border-b">
				<div className="flex flex-row items-center justify-center w-full p-2 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 items-center justify-center md:px-6">
					<div className="h-10 focus:outline-none focus:shadow-outline">
						<span className="text-sm tracking-tighter text-black transition duration-500 ease-in-out transform hover:text-slate-500 text-opacity-80 tracking-relaxed">
							<a href="/" className="inline-flex items-center">
								<svg
									className="w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
									id="Layer_1"
									x="0px"
									y="0px"
									viewBox="0 0 229 229"
									fill="currentColor"
								>
									<g
										transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#000000"
										stroke="none"
									>
										<path d="M465 1686 c-85 -32 -126 -111 -110 -214 21 -144 241 -190 327 -68 31 42 37 148 12 201 -35 74 -143 112 -229 81z m125 -52 c49 -20 70 -56 70 -119 0 -66 -21 -100 -74 -120 -79 -30 -153 0 -176 71 -23 69 5 144 63 169 42 19 68 18 117 -1z" />
										<path d="M925 1681 c-72 -33 -105 -86 -105 -167 0 -58 20 -103 59 -137 110 -92 283 -30 298 106 11 96 -23 163 -102 198 -51 24 -99 24 -150 0z m129 -45 c18 -7 43 -26 55 -42 31 -40 26 -131 -9 -169 -54 -58 -153 -55 -204 6 -35 41 -37 123 -4 164 39 50 102 66 162 41z" />
										<path d="M1397 1686 c-79 -29 -107 -75 -107 -174 0 -55 5 -76 23 -102 69 -104 244 -101 308 4 26 43 26 159 0 202 -41 67 -145 99 -224 70z m102 -42 c18 -4 45 -20 62 -36 26 -26 29 -36 29 -93 0 -57 -3 -66 -30 -93 -54 -54 -155 -51 -200 5 -15 19 -20 41 -20 87 0 70 16 101 64 122 36 15 51 17 95 8z" />
										<path d="M353 1315 c-31 -22 -236 -384 -236 -417 0 -40 29 -68 70 -68 35 0 59 19 111 85 l23 30 -6 -45 c-15 -110 -55 -495 -55 -525 0 -44 31 -70 81 -69 67 2 83 26 119 181 18 74 33 133 35 131 1 -2 8 -50 14 -108 18 -164 20 -170 55 -191 36 -23 88 -20 118 8 18 16 19 28 12 262 -6 228 -2 318 22 514 l6 47 44 0 44 0 0 -152 c0 -98 -9 -243 -26 -401 -25 -235 -26 -248 -9 -267 25 -27 67 -34 109 -16 43 18 46 24 81 199 16 75 31 137 35 137 4 0 19 -62 35 -137 35 -175 38 -181 81 -199 45 -19 89 -10 110 21 14 22 14 45 -10 262 -17 154 -26 295 -26 396 l0 157 44 0 44 0 6 -42 c22 -165 28 -303 21 -523 -6 -230 -6 -241 13 -258 30 -28 82 -31 118 -8 35 21 37 27 55 191 6 58 13 106 14 108 2 2 17 -57 35 -131 36 -155 52 -179 119 -181 50 -1 81 25 81 68 0 29 -42 432 -56 528 -5 43 -5 43 13 21 10 -11 31 -37 46 -57 23 -30 34 -36 66 -36 46 0 71 24 71 68 0 39 -201 395 -236 418 -26 18 -52 15 -127 -11 -41 -15 -53 -16 -90 -4 -67 20 -301 23 -369 4 -47 -13 -63 -13 -100 -3 -60 17 -330 16 -385 -1 -37 -12 -49 -11 -90 4 -72 25 -105 28 -130 10z m81 -49 c58 -24 108 -28 161 -11 82 25 116 20 155 -20 l34 -35 -52 0 c-33 0 -54 -5 -57 -12 -2 -7 -12 -92 -21 -188 -13 -137 -15 -226 -10 -407 6 -216 5 -232 -11 -235 -31 -7 -53 3 -58 26 -2 11 -11 86 -20 166 -9 80 -22 151 -27 158 -13 15 -54 16 -63 1 -4 -5 -24 -83 -45 -172 -41 -175 -58 -204 -99 -178 -13 8 -12 38 8 218 12 114 32 270 43 345 30 207 17 216 -90 63 -69 -99 -99 -124 -116 -97 -5 8 180 348 206 380 13 15 21 15 62 -2z m1200 -8 c49 -76 204 -363 200 -370 -17 -27 -47 -1 -116 97 -108 154 -121 144 -89 -68 11 -78 31 -234 42 -345 19 -174 20 -205 8 -213 -41 -26 -57 3 -102 186 -40 163 -43 170 -68 173 -14 2 -31 -3 -36 -10 -6 -7 -19 -78 -28 -158 -9 -80 -18 -155 -20 -167 -5 -22 -27 -32 -58 -25 -17 4 -17 19 -11 236 5 181 3 269 -10 406 -9 96 -19 181 -21 188 -3 7 -24 12 -57 12 l-52 0 34 35 c39 40 73 45 155 20 53 -17 104 -13 159 11 43 18 53 17 70 -8z m-692 -4 c43 -15 57 -15 96 -4 98 26 197 23 151 -6 -6 -3 -20 -25 -30 -48 -28 -63 -26 -310 6 -601 21 -183 23 -230 13 -236 -12 -8 -46 -3 -57 7 -3 2 -22 86 -43 186 -21 100 -43 188 -49 195 -7 7 -19 13 -29 13 -10 0 -22 -6 -29 -13 -6 -7 -28 -95 -49 -195 -21 -100 -40 -184 -43 -186 -11 -10 -45 -15 -57 -7 -11 6 -9 50 12 235 18 153 26 281 26 392 0 175 -8 214 -52 261 l-21 23 52 0 c29 0 75 -7 103 -16z" />
									</g>
								</svg>
								<span className="select-none text-base font-bold leading-snug tracking-wide">
									Friendore
								</span>
							</a>
						</span>
					</div>
				</div>
			</section>
			<section className="animate-slide-fade relative w-full overflow-hidden">
				<div className="flex flex-col w-full p-5 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 md:px-6">
					<main className="container mx-auto p-6 bg-white rounded-lg">
						<h1 className="text-2xl font-semibold text-gray-900 mb-4">
							Privacy Policy
						</h1>
						<p>Updated at 2024-08-23</p>
						<p>
							Friendore (“we,” “our,” or “us”) is committed to protecting your
							privacy. This Privacy Policy explains how your personal
							information is collected, used, and disclosed by Friendore.
						</p>
						<p>
							This Privacy Policy applies to our website, and its associated
							subdomains (collectively, our “Service”) alongside our
							application, Friendore. By accessing or using our Service, you
							signify that you have read, understood, and agree to our
							collection, storage, use, and disclosure of your personal
							information as described in this Privacy Policy and our Terms of
							Service.
						</p>

						<h3 className="mt-6 font-semibold">Definitions and key terms</h3>
						<p>
							To help explain things as clearly as possible in this Privacy
							Policy, every time any of these terms are referenced, are strictly
							defined as:
							<ul className="list-disc pl-6 space-y-2">
								<li>
									Cookie: small amount of data generated by a website and saved
									by your web browser. It is used to identify your browser,
									provide analytics, remember information about you such as your
									language preference or login information.
								</li>
								<li>
									Company: when this policy mentions “Company,” “we,” “us,” or
									“our,” it refers to Friendore, that is responsible for your
									information under this Privacy Policy.
								</li>
								<li>
									Country: where Friendore or the owners/founders of Friendore
									are based, in this case is Latvia
								</li>
								<li>
									Customer: refers to the company, organization or person that
									signs up to use the Friendore Service to manage the
									relationships with your consumers or service users.
								</li>
								<li>
									Device: any internet connected device such as a phone, tablet,
									computer or any other device that can be used to visit
									Friendore and use the services.
								</li>
								<li>
									IP address: Every device connected to the Internet is assigned
									a number known as an Internet protocol (IP) address. These
									numbers are usually assigned in geographic blocks. An IP
									address can often be used to identify the location from which
									a device is connecting to the Internet.
								</li>
								<li>
									Personnel: refers to those individuals who are employed by
									Friendore or are under contract to perform a service on behalf
									of one of the parties.
								</li>
								<li>
									Personal Data: any information that directly, indirectly, or
									in connection with other information — including a personal
									identification number — allows for the identification or
									identifiability of a natural person.
								</li>
								<li>
									Service: refers to the service provided by Friendore as
									described in the relative terms (if available) and on this
									platform.
								</li>
								<li>
									Third-party service: refers to advertisers, contest sponsors,
									promotional and marketing partners, and others who provide our
									content or whose products or services we think may interest
									you.
								</li>
								<li>
									Website: Friendore&rsquo;s site, which can be accessed via
									this URL: http://friendore.com/
								</li>
								<li>
									You: a person or entity that is registered with Friendore to
									use the Services.
								</li>
							</ul>
						</p>
						<h3 className="mt-6 font-semibold">
							What Information Do We Collect?
						</h3>
						<p>
							We collect information from you when you visit our website,
							register on our site, place an order, subscribe to our newsletter,
							respond to a survey or fill out a form.
						</p>

						<ul className="list-disc pl-6 space-y-2">
							<li>Email Addresses</li>
						</ul>
						<ul />

						<h3 className="mt-6 font-semibold">
							How Do We Use The Information We Collect?
						</h3>
						<p>
							Any of the information we collect from you may be used in one of
							the following ways:
							<ul className="list-disc pl-6 space-y-2">
								<li>
									To personalize your experience (your information helps us to
									better respond to your individual needs)
								</li>
								<li>
									To improve our website (we continually strive to improve our
									website offerings based on the information and feedback we
									receive from you)
								</li>
								<li>
									To improve customer service (your information helps us to more
									effectively respond to your customer service requests and
									support needs)
								</li>
								<li>To process transactions</li>
								<li>
									To administer a contest, promotion, survey or other site
									feature
								</li>
								<li>To send periodic emails</li>
							</ul>
						</p>

						<h3 className="mt-6 font-semibold">
							When does Friendore use end user information from third parties?
						</h3>
						<p>
							Friendore will collect End User Data necessary to provide the
							Friendore services to our customers.
						</p>
						<p>
							End users may voluntarily provide us with information they have
							made available on social media websites. If you provide us with
							any such information, we may collect publicly available
							information from the social media websites you have indicated. You
							can control how much of your information social media websites
							make public by visiting these websites and changing your privacy
							settings.
						</p>

						<h3 className="mt-6 font-semibold">
							When does Friendore use customer information from third parties?
						</h3>
						<p>
							We receive some information from the third parties when you
							contact us. For example, when you submit your email address to us
							to show interest in becoming a Friendore customer, we receive
							information from a third party that provides automated fraud
							detection services to Friendore. We also occasionally collect
							information that is made publicly available on social media
							websites. You can control how much of your information social
							media websites make public by visiting these websites and changing
							your privacy settings.
						</p>

						<h3 className="mt-6 font-semibold">
							Do we share the information we collect with third parties?
						</h3>
						<p>
							We may share the information that we collect, both personal and
							non-personal, with third parties such as advertisers, contest
							sponsors, promotional and marketing partners, and others who
							provide our content or whose products or services we think may
							interest you. We may also share it with our current and future
							affiliated companies and business partners, and if we are involved
							in a merger, asset sale or other business reorganization, we may
							also share or transfer your personal and non-personal information
							to our successors-in-interest.
						</p>
						<p>
							We may engage trusted third party service providers to perform
							functions and provide services to us, such as hosting and
							maintaining our servers and the website, database storage and
							management, e-mail management, storage marketing, credit card
							processing, customer service and fulfilling orders for products
							and services you may purchase through the website. We will likely
							share your personal information, and possibly some non-personal
							information, with these third parties to enable them to perform
							these services for us and for you.
						</p>
						<p>
							We may share portions of our log file data, including IP
							addresses, for analytics purposes with third parties such as web
							analytics partners, application developers, and ad networks. If
							your IP address is shared, it may be used to estimate general
							location and other technographics such as connection speed,
							whether you have visited the website in a shared location, and
							type of the device used to visit the website. They may aggregate
							information about our advertising and what you see on the website
							and then provide auditing, research and reporting for us and our
							advertisers. We may also disclose personal and non-personal
							information about you to government or law enforcement officials
							or private parties as we, in our sole discretion, believe
							necessary or appropriate in order to respond to claims, legal
							process (including subpoenas), to protect our rights and interests
							or those of a third party, the safety of the public or any person,
							to prevent or stop any illegal, unethical, or legally actionable
							activity, or to otherwise comply with applicable court orders,
							laws, rules and regulations.
						</p>

						<h3 className="mt-6 font-semibold">
							Where and when is information collected from customers and end
							users?
						</h3>
						<p>
							Friendore will collect personal information that you submit to us.
							We may also receive personal information about you from third
							parties as described above.
						</p>

						<h3 className="mt-6 font-semibold">
							How Do We Use Your Email Address?
						</h3>
						<p>
							By submitting your email address on this website, you agree to
							receive emails from us. You can cancel your participation in any
							of these email lists at any time by clicking on the opt-out link
							or other unsubscribe option that is included in the respective
							email. We only send emails to people who have authorized us to
							contact them, either directly, or through a third party. We do not
							send unsolicited commercial emails, because we hate spam as much
							as you do. By submitting your email address, you also agree to
							allow us to use your email address for customer audience targeting
							on sites like Facebook, where we display custom advertising to
							specific people who have opted-in to receive communications from
							us. Email addresses submitted only through the order processing
							page will be used for the sole purpose of sending you information
							and updates pertaining to your order. If, however, you have
							provided the same email to us through another method, we may use
							it for any of the purposes stated in this Policy. Note: If at any
							time you would like to unsubscribe from receiving future emails,
							we include detailed unsubscribe instructions at the bottom of each
							email.
						</p>

						<h3 className="mt-6 font-semibold">
							How Long Do We Keep Your Information?
						</h3>
						<p>
							We keep your information only so long as we need it to provide
							Friendore to you and fulfill the purposes described in this
							policy. This is also the case for anyone that we share your
							information with and who carries out services on our behalf. When
							we no longer need to use your information and there is no need for
							us to keep it to comply with our legal or regulatory obligations,
							we&rsquo;ll either remove it from our systems or depersonalize it
							so that we can&rsquo;t identify you.
						</p>

						<h3 className="mt-6 font-semibold">
							How Do We Protect Your Information?
						</h3>
						<p>
							We implement a variety of security measures to maintain the safety
							of your personal information when you place an order or enter,
							submit, or access your personal information. We offer the use of a
							secure server. All supplied sensitive/credit information is
							transmitted via Secure Socket Layer (SSL) technology and then
							encrypted into our Payment gateway providers database only to be
							accessible by those authorized with special access rights to such
							systems, and are required to keep the information confidential.
							After a transaction, your private information (credit cards,
							social security numbers, financials, etc.) is never kept on file.
							We cannot, however, ensure or warrant the absolute security of any
							information you transmit to Friendore or guarantee that your
							information on the Service may not be accessed, disclosed,
							altered, or destroyed by a breach of any of our physical,
							technical, or managerial safeguards.
						</p>

						<h3 className="mt-6 font-semibold">
							Could my information be transferred to other countries?
						</h3>
						<p>
							Friendore is incorporated in Latvia. Information collected via our
							website, through direct interactions with you, or from use of our
							help services may be transferred from time to time to our offices
							or personnel, or to third parties, located throughout the world,
							and may be viewed and hosted anywhere in the world, including
							countries that may not have laws of general applicability
							regulating the use and transfer of such data. To the fullest
							extent allowed by applicable law, by using any of the above, you
							voluntarily consent to the trans-border transfer and hosting of
							such information.
						</p>

						<h3 className="mt-6 font-semibold">
							Is the information collected through the Friendore Service secure?
						</h3>
						<p>
							We take precautions to protect the security of your information.
							We have physical, electronic, and managerial procedures to help
							safeguard, prevent unauthorized access, maintain data security,
							and correctly use your information. However, neither people nor
							security systems are foolproof, including encryption systems. In
							addition, people can commit intentional crimes, make mistakes or
							fail to follow policies. Therefore, while we use reasonable
							efforts to protect your personal information, we cannot guarantee
							its absolute security. If applicable law imposes any
							non-disclaimable duty to protect your personal information, you
							agree that intentional misconduct will be the standards used to
							measure our compliance with that duty.
						</p>

						<h3 className="mt-6 font-semibold">
							Can I update or correct my information?
						</h3>
						<p>
							The rights you have to request updates or corrections to the
							information Friendore collects depend on your relationship with
							Friendore. Personnel may update or correct their information as
							detailed in our internal company employment policies.
						</p>
						<p>
							Customers have the right to request the restriction of certain
							uses and disclosures of personally identifiable information as
							follows. You can contact us in order to (1) update or correct your
							personally identifiable information, (2) change your preferences
							with respect to communications and other information you receive
							from us, or (3) delete the personally identifiable information
							maintained about you on our systems (subject to the following
							paragraph), by cancelling your account. Such updates, corrections,
							changes and deletions will have no effect on other information
							that we maintain, or information that we have provided to third
							parties in accordance with this Privacy Policy prior to such
							update, correction, change or deletion. To protect your privacy
							and security, we may take reasonable steps (such as requesting a
							unique password) to verify your identity before granting you
							profile access or making corrections. You are responsible for
							maintaining the secrecy of your unique password and account
							information at all times.
						</p>
						<p>
							You should be aware that it is not technologically possible to
							remove each and every record of the information you have provided
							to us from our system. The need to back up our systems to protect
							information from inadvertent loss means that a copy of your
							information may exist in a non-erasable form that will be
							difficult or impossible for us to locate. Promptly after receiving
							your request, all personal information stored in databases we
							actively use, and other readily searchable media will be updated,
							corrected, changed or deleted, as appropriate, as soon as and to
							the extent reasonably and technically practicable.
						</p>
						<p>
							If you are an end user and wish to update, delete, or receive any
							information we have about you, you may do so by contacting the
							organization of which you are a customer.
						</p>
						<h3 className="mt-6 font-semibold">Sale of Business</h3>
						<p>
							We reserve the right to transfer information to a third party in
							the event of a sale, merger or other transfer of all or
							substantially all of the assets of Friendore or any of its
							Corporate Affiliates (as defined herein), or that portion of
							Friendore or any of its Corporate Affiliates to which the Service
							relates, or in the event that we discontinue our business or file
							a petition or have filed against us a petition in bankruptcy,
							reorganization or similar proceeding, provided that the third
							party agrees to adhere to the terms of this Privacy Policy.
						</p>

						<h3 className="mt-6 font-semibold">Affiliates</h3>
						<p>
							We may disclose information (including personal information) about
							you to our Corporate Affiliates. For purposes of this Privacy
							Policy, &quot;Corporate Affiliate&quot; means any person or entity
							which directly or indirectly controls, is controlled by or is
							under common control with Friendore, whether by ownership or
							otherwise. Any information relating to you that we provide to our
							Corporate Affiliates will be treated by those Corporate Affiliates
							in accordance with the terms of this Privacy Policy.
						</p>

						<h3 className="mt-6 font-semibold">Governing Law</h3>
						<p>
							This Privacy Policy is governed by the laws of Latvia without
							regard to its conflict of laws provision. You consent to the
							exclusive jurisdiction of the courts in connection with any action
							or dispute arising between the parties under or in connection with
							this Privacy Policy except for those individuals who may have
							rights to make claims under Privacy Shield, or the Swiss-US
							framework.
						</p>
						<p>
							The laws of Latvia, excluding its conflicts of law rules, shall
							govern this Agreement and your use of the website. Your use of the
							website may also be subject to other local, state, national, or
							international laws.
						</p>
						<p>
							By using Friendore or contacting us directly, you signify your
							acceptance of this Privacy Policy. If you do not agree to this
							Privacy Policy, you should not engage with our website, or use our
							services. Continued use of the website, direct engagement with us,
							or following the posting of changes to this Privacy Policy that do
							not significantly affect the use or disclosure of your personal
							information will mean that you accept those changes.
						</p>

						<h3 className="mt-6 font-semibold">Your Consent</h3>
						<p>
							We&rsquo;ve updated our Privacy Policy to provide you with
							complete transparency into what is being set when you visit our
							site and how it&rsquo;s being used. By using our website,
							registering an account, or making a purchase, you hereby consent
							to our Privacy Policy and agree to its terms.
						</p>

						<h3 className="mt-6 font-semibold">Links to Other Websites</h3>
						<p>
							This Privacy Policy applies only to the Services. The Services may
							contain links to other websites not operated or controlled by
							Friendore. We are not responsible for the content, accuracy or
							opinions expressed in such websites, and such websites are not
							investigated, monitored or checked for accuracy or completeness by
							us. Please remember that when you use a link to go from the
							Services to another website, our Privacy Policy is no longer in
							effect. Your browsing and interaction on any other website,
							including those that have a link on our platform, is subject to
							that website&rsquo;s own rules and policies. Such third parties
							may use their own cookies or other methods to collect information
							about you.
						</p>
						<h3 className="mt-6 font-semibold">Cookies</h3>
						<p>
							Friendore uses &quot;Cookies&quot; to identify the areas of our
							website that you have visited. A Cookie is a small piece of data
							stored on your computer or mobile device by your web browser. We
							use Cookies to enhance the performance and functionality of our
							website but are non-essential to their use. However, without these
							cookies, certain functionality like videos may become unavailable
							or you would be required to enter your login details every time
							you visit the website as we would not be able to remember that you
							had logged in previously. Most web browsers can be set to disable
							the use of Cookies. However, if you disable Cookies, you may not
							be able to access functionality on our website correctly or at
							all. We never place Personally Identifiable Information in
							Cookies.
						</p>

						<h3 className="mt-6 font-semibold">
							Blocking and disabling cookies and similar technologies
						</h3>
						<p>
							Wherever you&rsquo;re located you may also set your browser to
							block cookies and similar technologies, but this action may block
							our essential cookies and prevent our website from functioning
							properly, and you may not be able to fully utilize all of its
							features and services. You should also be aware that you may also
							lose some saved information (e.g. saved login details, site
							preferences) if you block cookies on your browser. Different
							browsers make different controls available to you. Disabling a
							cookie or category of cookie does not delete the cookie from your
							browser, you will need to do this yourself from within your
							browser, you should visit your browser&rsquo;s help menu for more
							information.
						</p>
						<h3 className="mt-6 font-semibold">Kids&rsquo; Privacy</h3>
						<p>
							We do not address anyone under the age of 13. We do not knowingly
							collect personally identifiable information from anyone under the
							age of 13. If You are a parent or guardian and You are aware that
							Your child has provided Us with Personal Data, please contact Us.
							If We become aware that We have collected Personal Data from
							anyone under the age of 13 without verification of parental
							consent, We take steps to remove that information from Our
							servers.
						</p>
						<h3 className="mt-6 font-semibold">
							Changes To Our Privacy Policy
						</h3>
						<p>
							We may change our Service and policies, and we may need to make
							changes to this Privacy Policy so that they accurately reflect our
							Service and policies. Unless otherwise required by law, we will
							notify you (for example, through our Service) before we make
							changes to this Privacy Policy and give you an opportunity to
							review them before they go into effect. Then, if you continue to
							use the Service, you will be bound by the updated Privacy Policy.
							If you do not want to agree to this or any updated Privacy Policy,
							you can delete your account.
						</p>

						<h3 className="mt-6 font-semibold">Third-Party Services</h3>
						<p>
							We may display, include or make available third-party content
							(including data, information, applications and other products
							services) or provide links to third-party websites or services
							(&quot;Third- Party Services&quot;).
						</p>
						<p>
							You acknowledge and agree that Friendore shall not be responsible
							for any Third-Party Services, including their accuracy,
							completeness, timeliness, validity, copyright compliance,
							legality, decency, quality or any other aspect thereof. Friendore
							does not assume and shall not have any liability or responsibility
							to you or any other person or entity for any Third-Party Services.
						</p>
						<p>
							Third-Party Services and links thereto are provided solely as a
							convenience to you and you access and use them entirely at your
							own risk and subject to such third parties&rsquo; terms and
							conditions.
						</p>
						<h3 className="mt-6 font-semibold">Tracking Technologies</h3>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Cookies
								<p>
									We use Cookies to enhance the performance and functionality of
									our platform but are non-essential to their use. However,
									without these cookies, certain functionality like videos may
									become unavailable or you would be required to enter your
									login details every time you visit the platform as we would
									not be able to remember that you had logged in previously.
								</p>
							</li>

							<li>
								Sessions
								<p>
									We use &quot;Sessions&quot; to identify the areas of our
									website that you have visited. A Session is a small piece of
									data stored on your computer or mobile device by your web
									browser.
								</p>
							</li>
						</ul>
						<h3 className="mt-6 font-semibold">
							Information about General Data Protection Regulation (GDPR)
						</h3>
						<p>
							We may be collecting and using information from you if you are
							from the European Economic Area (EEA), and in this section of our
							Privacy Policy we are going to explain exactly how and why is this
							data collected, and how we maintain this data under protection
							from being replicated or used in the wrong way.
						</p>

						<h3 className="mt-6 font-semibold">What is GDPR?</h3>
						<p>
							GDPR is an EU-wide privacy and data protection law that regulates
							how EU residents&rsquo; data is protected by companies and
							enhances the control the EU residents have, over their personal
							data.
						</p>
						<p>
							The GDPR is relevant to any globally operating company and not
							just the EU-based businesses and EU residents. Our
							customers&rsquo; data is important irrespective of where they are
							located, which is why we have implemented GDPR controls as our
							baseline standard for all our operations worldwide.
						</p>

						<h3 className="mt-6 font-semibold">What is personal data?</h3>
						<p>
							Any data that relates to an identifiable or identified individual.
							GDPR covers a broad spectrum of information that could be used on
							its own, or in combination with other pieces of information, to
							identify a person. Personal data extends beyond a person&rsquo;s
							name or email address. Some examples include financial
							information, political opinions, genetic data, biometric data, IP
							addresses, physical address, sexual orientation, and ethnicity.
						</p>
						<p>The Data Protection Principles include requirements such as:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Personal data collected must be processed in a fair, legal, and
								transparent way and should only be used in a way that a person
								would reasonably expect.
							</li>
							<li>
								Personal data should only be collected to fulfil a specific
								purpose and it should only be used for that purpose.
								Organizations must specify why they need the personal data when
								they collect it.
							</li>
							<li>
								Personal data should be held no longer than necessary to fulfil
								its purpose.
							</li>
							<li>
								People covered by the GDPR have the right to access their own
								personal data. They can also request a copy of their data, and
								that their data be updated, deleted, restricted, or moved to
								another organization.
							</li>
						</ul>

						<h3 className="mt-6 font-semibold">Why is GDPR important?</h3>
						<p>
							GDPR adds some new requirements regarding how companies should
							protect individuals&rsquo; personal data that they collect and
							process. It also raises the stakes for compliance by increasing
							enforcement and imposing greater fines for breach. Beyond these
							facts it&rsquo;s simply the right thing to do. At Friendore we
							strongly believe that your data privacy is very important and we
							already have solid security and privacy practices in place that go
							beyond the requirements of this new regulation.
						</p>

						<h3 className="mt-6 font-semibold">
							Individual Data Subject&rsquo;s Rights - Data Access, Portability
							and Deletion
						</h3>
						<p>
							We are committed to helping our customers meet the data subject
							rights requirements of GDPR. Friendore processes or stores all
							personal data in fully vetted, DPA compliant vendors. We do store
							all conversation and personal data for up to 6 years unless your
							account is deleted. In which case, we dispose of all data in
							accordance with our Terms of Service and Privacy Policy, but we
							will not hold it longer than 60 days.
						</p>
						<p>
							We are aware that if you are working with EU customers, you need
							to be able to provide them with the ability to access, update,
							retrieve and remove personal data. We got you! We&rsquo;ve been
							set up as self service from the start and have always given you
							access to your data and your customers data. Our customer support
							team is here for you to answer any questions you might have about
							working with the API.
						</p>
						<h3 className="mt-6 font-semibold">California Residents</h3>
						<p>
							The California Consumer Privacy Act (CCPA) requires us to disclose
							categories of Personal Information we collect and how we use it,
							the categories of sources from whom we collect Personal
							Information, and the third parties with whom we share it, which we
							have explained above.
						</p>
						<p>
							We are also required to communicate information about rights
							California residents have under California law. You may exercise
							the following rights:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Right to Know and Access. You may submit a verifiable request
								for information regarding the: (1) categories of Personal
								Information we collect, use, or share; (2) purposes for which
								categories of Personal Information are collected or used by us;
								(3) categories of sources from which we collect Personal
								Information; and (4) specific pieces of Personal Information we
								have collected about you.
							</li>
							<li>
								Right to Equal Service. We will not discriminate against you if
								you exercise your privacy rights.
							</li>
							<li>
								Right to Delete. You may submit a verifiable request to close
								your account and we will delete Personal Information about you
								that we have collected.
							</li>
							<li>
								Request that a business that sells a consumer&rsquo;s personal
								data, not sell the consumer&rsquo;s personal data.
							</li>
						</ul>
						<p>
							If you make a request, we have one month to respond to you. If you
							would like to exercise any of these rights, please contact us.
						</p>
						<p>We do not sell the Personal Information of our users.</p>
						<p>For more information about these rights, please contact us.</p>
						<h3 className="mt-6 font-semibold">
							California Online Privacy Protection Act (CalOPPA)
						</h3>
						<p>
							CalOPPA requires us to disclose categories of Personal Information
							we collect and how we use it, the categories of sources from whom
							we collect Personal Information, and the third parties with whom
							we share it, which we have explained above.
						</p>
						<p>CalOPPA users have the following rights:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Right to Know and Access. You may submit a verifiable request
								for information regarding the: (1) categories of Personal
								Information we collect, use, or share; (2) purposes for which
								categories of Personal Information are collected or used by us;
								(3) categories of sources from which we collect Personal
								Information; and (4) specific pieces of Personal Information we
								have collected about you.
							</li>
							<li>
								Right to Equal Service. We will not discriminate against you if
								you exercise your privacy rights.
							</li>
							<li>
								Right to Delete. You may submit a verifiable request to close
								your account and we will delete Personal Information about you
								that we have collected.
							</li>
							<li>
								Right to request that a business that sells a consumer&rsquo;s
								personal data, not sell the consumer&rsquo;s personal data.
							</li>
						</ul>
						<p>
							If you make a request, we have one month to respond to you. If you
							would like to exercise any of these rights, please contact us.
						</p>
						<p>We do not sell the Personal Information of our users.</p>
						<p>For more information about these rights, please contact us.</p>
						<h3 className="mt-6 font-semibold">Contact Us</h3>
						<p>Don&rsquo;t hesitate to contact us if you have any questions.</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Via Email:{" "}
								<a href="mailto:admin@friendore.com">admin@friendore.com</a>
							</li>
						</ul>
					</main>
				</div>
			</section>
			<Footer />
		</>
	);
}
